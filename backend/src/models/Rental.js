import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    rentalDate: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        required: true,
        default: function() {
            const date = new Date();
            date.setDate(date.getDate() + 7); // 7 jours de location par défaut
            return date;
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    }
}, { timestamps: true });

// Optimisation : Index pour éviter les doublons accidentels et accélérer les requêtes
rentalSchema.index({ user: 1, movie: 1 });
rentalSchema.index({ status: 1, expiryDate: 1 });

// Virtuals
rentalSchema.virtual('isValid').get(function() {
    return this.status === 'active' && new Date() < this.expiryDate;
});

rentalSchema.virtual('daysLeft').get(function() {
    if (this.status !== 'active') return 0;
    const diff = this.expiryDate - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Instance methods
rentalSchema.methods.isActive = function() {
    return this.status === 'active' && new Date() < this.expiryDate;
};

rentalSchema.methods.markAsExpired = async function() {
    this.status = 'expired';
    return await this.save();
};

// Static methods
rentalSchema.statics.getActiveRentals = function(userId) {
    return this.find({
        user: userId,
        status: 'active',
        expiryDate: { $gt: new Date() }
    }).populate('movie').sort({ rentalDate: -1 });
};

rentalSchema.statics.getExpiredRentals = function(userId) {
    return this.find({
        user: userId,
        $or: [
            { status: 'expired' },
            { expiryDate: { $lt: new Date() } }
        ]
    }).populate('movie').sort({ expiryDate: -1 });
};

// Hook exécuté avant les requêtes find() pour corriger le statut à la volée 
rentalSchema.pre(/^find/, async function() {
    // Marquer comme expirées les locations dont la date est dépassée
    await this.model.updateMany(
        { expiryDate: { $lt: new Date() }, status: 'active' },
        { status: 'expired' }
    );
});

export default mongoose.model('Rental', rentalSchema);
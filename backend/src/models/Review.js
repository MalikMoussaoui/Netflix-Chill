import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'L\'utilisateur est requis']
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Le film est requis']
    },
    rating: {
        type: Number,
        required: [true, 'La note est requise'],
        min: [1, 'La note minimale est 1 étoile'],
        max: [5, 'La note maximale est 5 étoiles']
    },
    comment: {
        type: String,
        trim: true,
        maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
    }
}, { timestamps: true });

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRating = async function(movieId) {
    const stats = await this.aggregate([
        { $match: { movie: movieId } },
        {
            $group: {
                _id: '$movie',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (stats.length > 0) {
            await mongoose.model('Movie').findByIdAndUpdate(movieId, {
                rating: Math.round(stats[0].averageRating * 10) / 10 
            });
        } else {
            await mongoose.model('Movie').findByIdAndUpdate(movieId, { rating: 0 });
        }
    } catch (error) {
        console.error('❌ Erreur lors du calcul de la moyenne:', error);
    }
};

reviewSchema.post('save', function() {
    this.constructor.calculateAverageRating(this.movie);
});

reviewSchema.post(/^findOneAnd/, async function(doc) {
    if (doc) {
        await doc.constructor.calculateAverageRating(doc.movie);
    }
});

export default mongoose.model('Review', reviewSchema);
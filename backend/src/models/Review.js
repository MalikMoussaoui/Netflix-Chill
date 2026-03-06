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

// 1. RÈGLE : Un seul avis par utilisateur pour un film donné 
// L'index composé avec "unique: true" empêche MongoDB d'insérer un doublon.
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

// 2. STATIQUE : Calcul de la moyenne des notes pour un film 
reviewSchema.statics.calculateAverageRating = async function(movieId) {
    // Agrégation pour calculer la moyenne de toutes les notes de ce film
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
        // Mise à jour de la note du film dans la collection Movie
        if (stats.length > 0) {
            await mongoose.model('Movie').findByIdAndUpdate(movieId, {
                // On arrondit à 1 décimale (ex: 4.3)
                rating: Math.round(stats[0].averageRating * 10) / 10 
            });
        } else {
            // S'il n'y a plus d'avis, on remet la note à 0
            await mongoose.model('Movie').findByIdAndUpdate(movieId, { rating: 0 });
        }
    } catch (error) {
        console.error('❌ Erreur lors du calcul de la moyenne:', error);
    }
};

// 3. MIDDLEWARE (HOOKS) : Automatiser le calcul 
// Se déclenche automatiquement APRES la création d'un nouvel avis
reviewSchema.post('save', function() {
    this.constructor.calculateAverageRating(this.movie);
});

// Se déclenche automatiquement APRES la suppression ou modification d'un avis
reviewSchema.post(/^findOneAnd/, async function(doc) {
    if (doc) {
        await doc.constructor.calculateAverageRating(doc.movie);
    }
});

export default mongoose.model('Review', reviewSchema);
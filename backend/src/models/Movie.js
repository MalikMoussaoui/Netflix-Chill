import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le titre est requis"],
        trim: true,
        maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"]
    },
    description: {
        type: String,
        required: [true, "La description est requise"],
        maxlength: [2000, "La description ne peut pas dépasser 2000 caractères"]
    },
    poster: {
        type: String,
        required: [true, "L'affiche est requise"],
        match: [/^https?:\/\/.+/, "L'URL de l'affiche doit être valide"]
    },
    backdrop: {
        type: String,
        required: [true, "L'image de fond est requise"],
        match: [/^https?:\/\/.+/, "L'URL de l'image de fond doit être valide"]
    },
    genre: {
        type: [String],
        required: [true, "Le genre est requis"],
        validate: [
            {
                validator: v => v && v.length > 0,
                message: "La liste des genres ne peut pas être vide"
            },
            {
                validator: v => v.length <= 5,
                message: "Un film ne peut pas avoir plus de 5 genres" // Ex 2 
            }
        ],
        enum: ["Action", "Comédie", "Drame", "Science-Fiction", "Horreur", "Thriller", "Romance", "Animation", "Documentaire"]
    },
    year: {
        type: Number,
        required: [true, "L'année est requise"],
        min: [1900, "L'année doit être supérieure à 1900"],
        max: [new Date().getFullYear() + 2, "L'année ne peut pas être dans un futur lointain"]
    },
    duration: {
        type: Number,
        required: [true, "La durée est requise"],
        min: [1, "La durée doit être positive"],
        max: [500, "La durée ne peut pas dépasser 500 minutes"] // Ex 2 
    },
    price: {
        type: Number,
        required: [true, "Le prix est requis"],
        min: [0, "Le prix doit être positif"],
        default: 3.99,
        validate: {
            validator: function(v) {
                return /^\d+(\.\d{1,2})?$/.test(v.toString()); // Ex 2 
            },
            message: "Le prix doit avoir au maximum 2 décimales"
        }
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rentalCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

// Indexation pour les recherches performantes
movieSchema.index({ title: "text", description: "text" });
movieSchema.index({ genre: 1 });
movieSchema.index({ year: -1 });
movieSchema.index({ rating: -1 });

// Propriétés virtuelles
movieSchema.virtual("durationFormatted").get(function() {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}min` : ""}`;
});

// Méthodes d'instances et statiques
movieSchema.methods.incrementRentalCount = async function() {
    this.rentalCount += 1;
    return await this.save();
};

movieSchema.statics.getRecentMovies = function(limit = 10) {
    return this.find({ isAvailable: true }).sort({ year: -1 }).limit(limit);
};

movieSchema.statics.search = function(query) {
    return this.find({
        $text: { $search: query },
        isAvailable: true
    }).sort({ score: { $meta: "textScore" } });
};

// Exercice 3: Méthodes de requête avancées
movieSchema.statics.getByGenre = function(genre) {
    return this.find({ genre, isAvailable: true }).sort({ rating: -1 });
};

movieSchema.statics.getByPriceRange = function(minPrice, maxPrice) {
    return this.find({ price: { $gte: minPrice, $lte: maxPrice }, isAvailable: true }).sort({ price: 1 });
};

movieSchema.statics.getStatsByGenre = async function() {
    return await this.aggregate([
        { $match: { isAvailable: true } },
        {
            $group: {
                _id: "$genre",
                count: { $sum: 1 },
                avgPrice: { $avg: "$price" },
                avgRating: { $avg: "$rating" },
                totalRentals: { $sum: "$rentalCount" }
            }
        },
        { $sort: { count: -1 } }
    ]);
};

export default mongoose.model('Movie', movieSchema);
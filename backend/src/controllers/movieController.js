import Movie from '../models/Movie.js';

// @desc    Récupérer tous les films (avec recherche, filtres, pagination)
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res, next) => {
    try {
        // 1. Construction de la requête de base (filtres)
        const query = {};
        
        // Si un terme de recherche est présent, on filtre sur le titre OU la description
        // $regex avec 'i' permet une recherche insensible à la casse
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        
        // Filtres exacts pour le genre et l'année si fournis
        if (req.query.genre) query.genre = req.query.genre;
        if (req.query.year) query.year = req.query.year;

        // 2. Gestion du tri (par défaut : les plus récents en premier)
        const sortOption = req.query.sort ? { [req.query.sort]: -1 } : { createdAt: -1 };

        // 3. Gestion de la pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit; // Nombre d'éléments à sauter

        // Exécution de la requête avec Mongoose
        const movies = await Movie.find(query).sort(sortOption).skip(skip).limit(limit);
        const total = await Movie.countDocuments(query);

        // Renvoi de la réponse formatée avec les métadonnées de pagination
        res.status(200).json({
            success: true,
            count: movies.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer un film unique par son ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};

// @desc    Récupérer des films similaires (même genre)
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });

        // On cherche des films ayant au moins un genre en commun
        // $ne (not equal) sert à exclure le film actuel des résultats
        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: movie._id },
            isAvailable: true
        }).sort({ rating: -1 }).limit(6);

        res.status(200).json({ success: true, data: similarMovies });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir des statistiques globales sur les films
// @route   GET /api/movies/stats
// @access  Admin (généralement)
export const getMovieStats = async (req, res, next) => {
    try {
        // Utilisation du pipeline d'agrégation MongoDB pour des calculs complexes
        const stats = await Movie.aggregate([
            {
                $group: {
                    _id: null, // On regroupe tous les documents ensemble
                    totalMovies: { $sum: 1 }, // Compteur simple
                    // Calcul du revenu estimé (prix * nombre de locations) pour chaque film, puis somme totale
                    estimatedRevenue: { $sum: { $multiply: ['$price', '$rentalCount'] } },
                    avgPrice: { $avg: '$price' },
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);
        res.status(200).json({ success: true, data: stats[0] || {} });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un nouveau film
// @route   POST /api/movies
// @access  Admin
export const createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour un film
// @route   PUT /api/movies/:id
// @access  Admin
export const updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Renvoie l'objet modifié plutôt que l'original
            runValidators: true // Relance les validations du modèle (ex: min/max)
        });
        if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Admin
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });
        
        await movie.deleteOne(); // Déclenche les hooks 'remove' si existants
        res.status(200).json({ success: true, message: "Film supprimé" });
    } catch (error) {
        next(error);
    }
};
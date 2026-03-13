import Movie from '../models/Movie.js';

export const getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};

export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "Film non trouvé" });
        }
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};
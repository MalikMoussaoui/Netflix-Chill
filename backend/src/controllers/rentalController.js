import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";

export const createRental = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        const userId = req.body.userId || "65f1a2b3c4d5e6f7a8b9c0d1";

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });

        const activeRental = await Rental.findOne({ user: userId, movie: movieId, status: 'active' });
        if (activeRental) return res.status(400).json({ success: false, message: "Film déjà loué" });

        const rental = await Rental.create({
            user: userId,
            movie: movieId,
            rentalDate: new Date(),
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await Movie.findByIdAndUpdate(movieId, { $inc: { rentalCount: 1 } });

        res.status(201).json({ success: true, data: rental });
    } catch (error) {
        next(error);
    }
};

export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.query.userId || "65f1a2b3c4d5e6f7a8b9c0d1";
        const query = { user: userId };
        
        if (req.query.status) query.status = req.query.status;

        const rentals = await Rental.find(query).populate('movie');
        
        res.status(200).json({ success: true, count: rentals.length, data: rentals });
    } catch (error) {
        next(error);
    }
};

export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find().populate('movie').populate('user', 'name email');
        res.status(200).json({ success: true, count: rentals.length, data: rentals });
    } catch (error) {
        next(error);
    }
};

export const cancelRental = async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).json({ success: false, message: "Location non trouvée" });

        await rental.deleteOne();
        res.status(200).json({ success: true, message: "Location annulée" });
    } catch (error) {
        next(error);
    }
};

export const getRentalStats = async (req, res, next) => {
    try {
        const stats = await Rental.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.query.userId || "65f1a2b3c4d5e6f7a8b9c0d1";
        const rentals = await Rental.find({ user: userId }).populate('movie');
        
        if (!rentals.length) {
            const popular = await Movie.find().sort({ rating: -1 }).limit(5);
            return res.status(200).json({ success: true, data: popular });
        }

        const genres = rentals.flatMap(r => r.movie.genre);
        const topGenre = genres.sort((a,b) => genres.filter(v => v===a).length - genres.filter(v => v===b).length).pop();
        const rentedMovieIds = rentals.map(r => r.movie._id);

        const recommendations = await Movie.find({
            genre: topGenre,
            _id: { $nin: rentedMovieIds },
            isAvailable: true
        }).limit(5);

        res.status(200).json({ success: true, data: recommendations });
    } catch (error) {
        next(error);
    }
};
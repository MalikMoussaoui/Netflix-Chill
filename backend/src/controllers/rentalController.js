import Rental from '../models/Rental.js';


export const createRental = async (req, res, next) => {
    try {
        const { movie, rentalDate, expiryDate } = req.body;
        
        const userId = req.body.userId || "65f1a2b3c4d5e6f7a8b9c0d1"; 

        const newRental = await Rental.create({
            user: userId,
            movie: movie, 
            rentalDate,
            expiryDate
        });

        res.status(201).json({
            success: true,
            data: newRental
        });
    } catch (error) {
        next(error);
    }
};

export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.params.userId || "65f1a2b3c4d5e6f7a8b9c0d1";
        
        const rentals = await Rental.find({ user: userId }).populate('movie');

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals
        });
    } catch (error) {
        next(error);
    }
};
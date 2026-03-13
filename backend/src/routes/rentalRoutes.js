import express from 'express';
import {
    createRental,
    getMyRentals,
    getAllRentals,
    cancelRental,
    getRentalStats,
    getRecommendations
} from '../controllers/rentalController.js';

const router = express.Router();

router.get('/', getAllRentals);
router.get('/my-rentals', getMyRentals);
router.get('/stats', getRentalStats);
router.get('/recommendations', getRecommendations);
router.post('/', createRental);
router.delete('/:id', cancelRental);

export default router;
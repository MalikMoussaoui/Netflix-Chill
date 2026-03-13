import express from 'express';
import { createRental, getMyRentals } from '../controllers/rentalController.js';

const router = express.Router();

router.post('/', createRental);

router.get('/:userId', getMyRentals);

export default router;
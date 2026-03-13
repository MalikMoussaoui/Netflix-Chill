import express from 'express';
import { 
    getMovies, 
    getMovieById, 
    getMovieStats, 
    getSimilarMovies, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/stats', getMovieStats);
router.get('/:id', getMovieById);
router.get('/:id/similar', getSimilarMovies);

router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
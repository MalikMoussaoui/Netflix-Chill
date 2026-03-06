import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database.js'; // <-- Ajout de notre module

// Initialisation des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(cors({ 
    origin: process.env.CLIENT_URL || 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());

// Routes basiques
app.get('/', (req, res) => {
    res.json({ message: 'API Netflix Chill en ligne' });
});

// Route de vérification d'état (Health Check) [cite: 871-877]
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Le serveur fonctionne parfaitement',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
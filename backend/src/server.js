import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database.js';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la BDD
connectDB();

// Middlewares globaux
app.use(cors({ 
    origin: process.env.CLIENT_URL || 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simple en développement
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.path}`);
        next();
    });
}

// Routes de base et Health Check
app.get('/', (req, res) => {
    res.json({ message: 'API Netflix Chill en ligne', version: '1.0.0' });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Le serveur fonctionne parfaitement',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// TODO: Plus tard, nous importerons ici nos vraies routes (auth, movies, rentals)

// --------------------------------------------------------
// GESTION DES ERREURS
// --------------------------------------------------------

// 1. Middleware pour les routes non trouvées (404)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route introuvable',
        path: req.path
    });
});

// 2. Middleware Global de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error('❌ Erreur interceptée :', err);

    // Erreur de validation Mongoose (ex: email invalide, titre trop court)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Erreur de validation',
            errors: messages
        });
    }

    // Erreur de Cast Mongoose (ex: mauvais format d'ID MongoDB)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID de ressource invalide'
        });
    }

    // Erreur de duplication (ex: un utilisateur s'inscrit avec un email déjà existant)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `Le champ '${field}' est déjà utilisé.`
        });
    }

    // Erreur serveur par défaut
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Erreur interne du serveur',
        // N'afficher la stack trace qu'en mode développement pour des raisons de sécurité
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

// Sécurité supplémentaire : gestion des crashs inattendus
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

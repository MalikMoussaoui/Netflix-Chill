import mongoose from 'mongoose';

/**
 * Gère la connexion à la base de données MongoDB.
 * Intègre la gestion des événements et de l'arrêt propre du processus.
 */
const connectDB = async () => {
    try {
        // Connexion à MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);

        // Écouteurs d'événements pour monitorer la connexion en temps réel
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        // Gestion de l'arrêt propre (SIGINT = Ctrl+C)
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🛑 MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error(`❌ Erreur critique de connexion: ${error.message}`);
        // Arrêt du processus en cas d'échec de la base de données (Fail-fast)
        process.exit(1); 
    }
};

export default connectDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const moviesPath = join(__dirname, '../../../frontend-user/src/data/movies.json');
const moviesData = JSON.parse(readFileSync(moviesPath, 'utf-8'));

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('🧹 Nettoyage de la base de données...');

        await User.deleteMany({});
        await Movie.deleteMany({});
        await Rental.deleteMany({});
        console.log('✅ Base de données nettoyée');

        console.log('👤 Création des utilisateurs...');
        const admin = await User.create({
            name: 'Admin Netflix',
            email: 'admin@netflix.com',
            password: 'admin123',
            role: 'admin'
        });

        const users = await User.create([
            { name: 'John Doe', email: 'john@example.com', password: 'password123' },
            { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
            { name: 'Bob Martin', email: 'bob@example.com', password: 'password123' }
        ]);
        console.log(`✅ ${users.length + 1} utilisateurs créés (dont 1 admin)`);

        console.log('🎬 Insertion des films...');
        const movies = await Movie.insertMany(moviesData);
        console.log(`✅ ${movies.length} films insérés`);

        console.log('📅 Création des locations...');
        const rentals = await Rental.create([
            {
                user: users[0]._id,
                movie: movies[0]._id,
                price: movies[0].price,
                rentalDate: new Date(),
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // + 7 jours
            },
            {
                user: users[0]._id,
                movie: movies[1]._id,
                price: movies[1].price,
                rentalDate: new Date(),
                expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // + 5 jours
            },
            {
                user: users[1]._id,
                movie: movies[2]._id,
                price: movies[2].price,
                rentalDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Il y a 10 jours
                expiryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),  // Expiré il y a 3 jours
                status: 'expired'
            }
        ]);
        console.log(`✅ ${rentals.length} locations créées`);

        await movies[0].incrementRentalCount();
        await movies[1].incrementRentalCount();
        await movies[2].incrementRentalCount();

        console.log('\n🎉 Base de données initialisée avec succès !');
        process.exit(0); // On ferme proprement le script
    } catch (error) {
        console.error(`❌ Erreur critique lors du seed: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
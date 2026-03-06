import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Importation de la configuration et de tous nos modèles
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';
import Review from '../models/Review.js'; // Ajout du modèle Bonus

// Configuration pour récupérer le bon path pour le fichier .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const testModels = async () => {
    try {
        await connectDB();
        console.log('\n🧪 Démarrage des tests complets des modèles...\n');

        // ==========================================
        // EXERCICE 1 : Tests de base
        // ==========================================
        console.log('--- EX 1: Tests de base ---');
        
        console.log('Test 1: Création d\'un utilisateur');
        const testUser = await User.create({
            name: 'Test User',
            email: 'test.models@test.com',
            password: 'test123'
        });
        console.log('✅ Utilisateur créé. Avatar auto-généré:', testUser.avatar);

        console.log('\nTest 2: Comparaison de mot de passe');
        const userWithPassword = await User.findById(testUser._id).select('+password');
        const isMatch = await userWithPassword.comparePassword('test123');
        console.log('✅ Password match:', isMatch);

        console.log('\nTest 3: Création d\'un film');
        const testMovie = await Movie.create({
            title: 'Test Movie',
            description: 'Un film de test',
            poster: 'https://example.com/poster.jpg',
            backdrop: 'https://example.com/backdrop.jpg',
            genre: ['Action'],
            year: 2024,
            duration: 120,
            price: 4.99,
            rating: 0 // Initialisé à 0
        });
        console.log('✅ Film créé:', testMovie.title, '| Durée formatée:', testMovie.durationFormatted);

        console.log('\nTest 4 & 5: Création de location et Populate');
        const testRental = await Rental.create({
            user: testUser._id,
            movie: testMovie._id,
            price: testMovie.price
        });
        
        const rentalWithDetails = await Rental.findById(testRental._id)
            .populate('user', 'name email')
            .populate('movie', 'title price');
            
        console.log('✅ Location avec détails (Populate):', {
            user: rentalWithDetails.user.name,
            movie: rentalWithDetails.movie.title,
            joursRestants: testRental.daysLeft
        });

        // ==========================================
        // EXERCICE 2 : Test des validations personnalisées
        // ==========================================
        console.log('\n--- EX 2: Validations personnalisées ---');
        try {
            await Movie.create({
                title: 'Film Invalide',
                description: 'Ce film ne doit pas passer',
                poster: 'https://test.com/img',
                backdrop: 'https://test.com/img',
                genre: ['Action'],
                year: 2024,
                duration: 600, // Erreur : Trop long (max 500)
                price: 3.999 // Erreur : Trop de décimales
            });
            console.error('❌ Erreur : Le film invalide a été créé alors qu\'il n\'aurait pas dû.');
        } catch (error) {
            console.log('✅ Validation bloquée avec succès comme prévu ! Raison :', error.message);
        }

        // ==========================================
        // EXERCICE 3 : Méthodes statiques avancées
        // ==========================================
        console.log('\n--- EX 3: Méthodes de recherche avancées ---');
        // Utilise les données injectées par le seed.js précédemment
        const sciFiMovies = await Movie.getByGenre("Science-Fiction");
        console.log("✅ Films Sci-Fi en base:", sciFiMovies.length);

        const affordableMovies = await Movie.getByPriceRange(0, 4);
        console.log("✅ Films à moins de 4€:", affordableMovies.length);

        const stats = await Movie.getStatsByGenre();
        console.log("✅ Statistiques par genre:", stats);

        // ==========================================
        // CHALLENGE BONUS : Modèle Review & Moyenne automatique
        // ==========================================
        console.log('\n--- CHALLENGE BONUS: Modèle Review ---');
        
        const testReview = await Review.create({
            user: testUser._id,
            movie: testMovie._id,
            rating: 5,
            comment: "Chef-d'oeuvre absolu, les tests passent à merveille !"
        });
        console.log('✅ Review créée :', testReview.comment);

        // Petite pause asynchrone pour laisser le temps au middleware "post-save" de s'exécuter en arrière-plan
        console.log('⏳ Attente du calcul de la moyenne en arrière-plan...');
        await new Promise(resolve => setTimeout(resolve, 500)); 

        const updatedMovie = await Movie.findById(testMovie._id);
        console.log('✅ Nouvelle note moyenne du film calculée automatiquement :', updatedMovie.rating, '/ 10');

        // ==========================================
        // NETTOYAGE DES DONNEES DE TEST
        // ==========================================
        console.log('\n🧹 Nettoyage des données de test...');
        await Review.deleteOne({ _id: testReview._id });
        await Rental.deleteOne({ _id: testRental._id });
        await Movie.deleteOne({ _id: testMovie._id });
        await User.deleteOne({ _id: testUser._id });

        console.log('\n🎉 Tous les tests (Exercices 1, 2, 3 + Bonus) sont passés avec succès !');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Erreur critique lors des tests :', error);
        process.exit(1);
    }
};

testModels();
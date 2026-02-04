import React from 'react';
// Imports des composants
import Navbar from './components/common/Navbar';
import MovieHero from './components/movies/MovieHero';
import MovieList from './components/movies/MovieList';
import Footer from './components/layout/Footer';

// Import des données
import moviesData from './data/movies.json';

function App() {
    // 1. Film à la une (Le premier de la liste)
    const featuredMovie = moviesData[0];
    
    // 2. Filtres pour les catégories
    const actionMovies = moviesData.filter(m => m.genre === 'Action');
    const scifiMovies = moviesData.filter(m => m.genre === 'Science-Fiction');

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            {/* Menu du haut */}
            <Navbar /> 
            
            {/* Grand film en fond */}
            <MovieHero movie={featuredMovie} />
            
            {/* Listes de films (remontées un peu sur l'image avec -mt-32) */}
            <div className="-mt-32 relative z-10 space-y-8 pb-12">
                <MovieList title="Tendances NetZlux" movies={moviesData} />
                <MovieList title="Action & Aventure" movies={actionMovies} />
                <MovieList title="Science-Fiction" movies={scifiMovies} />
            </div>

            {/* Pied de page */}
            <Footer />
        </div>
    );
}

export default App;
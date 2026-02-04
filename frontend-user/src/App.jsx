import React from 'react';
import Navbar from './components/common/Navbar';
import MovieHero from './components/movies/MovieHero';
import MovieList from './components/movies/MovieList';
import Footer from './components/layout/Footer';
import moviesData from './data/movies.json';

function App() {
    // On prend le premier film pour la bannière
    const featuredMovie = moviesData[0];

    // On simule des catégories en mélangeant les films
    const popularMovies = moviesData;
    const actionMovies = moviesData.filter((m) => m.genre === 'Action');
    const scifiMovies = moviesData.filter((m) => m.genre === 'Science-Fiction');

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar />
            <MovieHero movie={featuredMovie} />
            <div className="-mt-32 relative z-10 space-y-8 pb-12">
                <MovieList title="Tendances actuelles" movies={popularMovies} />
                <MovieList title="Action & Aventure" movies={actionMovies} />
                <MovieList title="Science-Fiction" movies={scifiMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default App;

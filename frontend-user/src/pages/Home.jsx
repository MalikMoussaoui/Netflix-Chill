import React from 'react';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import Footer from '../components/layout/Footer';
import moviesData from '../data/movies.json';

function Home() {
    const featuredMovie = moviesData[0];
    const actionMovies = moviesData.filter(m => m.genre === 'Action');
    const scifiMovies = moviesData.filter(m => m.genre === 'Science-Fiction');

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar />
            <MovieHero movie={featuredMovie} />
            <div className="-mt-15 relative z-10 space-y-4 pb-12">
                <MovieCarousel title="Tendances Actuelles" movies={moviesData} />
                <MovieCarousel title="Action & Aventure" movies={actionMovies} />
                <MovieCarousel title="Science-Fiction" movies={scifiMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
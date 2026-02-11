import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
import MovieCarousel from '../components/movies/MovieCarousel';
import Footer from '../components/layout/Footer';
import moviesData from '../data/movies.json';
import MovieFilter from '../components/movies/MovieFilter';


function Home() {
    const [filteredMovies, setFilteredMovies] = useState(moviesData);
    const featuredMovie = moviesData[0];

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar />
            <MovieHero movie={featuredMovie} />
            <div className="-mt-15 relative z-10 space-y-4 pb-12">
                <MovieCarousel title="Tendances Actuelles" movies={moviesData} />
                <MovieFilter movies={moviesData} onFilter={setFilteredMovies} />
                <MovieList title="Catalogue" movies={filteredMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
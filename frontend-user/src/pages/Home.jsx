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
    const [likedMovies, setLikedMovies] = useState([]);
    const featuredMovie = moviesData[0];

    const toggleLike = (movieId) => {
        if (likedMovies.includes(movieId)) {
            setLikedMovies(likedMovies.filter(id => id !== movieId));
        } else {
            setLikedMovies([...likedMovies, movieId]);
        }
    };

    const handleSearch = (input) => {
        // Protection : si input est un événement (e), on récupère la valeur, sinon on utilise l'input tel quel
        const term = (input && typeof input === 'object' && input.target) ? input.target.value : input;
        const safeTerm = typeof term === 'string' ? term : "";

        const filtered = moviesData.filter(movie => 
            movie.title.toLowerCase().includes(safeTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Navbar onSearch={handleSearch} movies={moviesData} />
            <MovieHero movie={featuredMovie} />
            <div className="-mt-15 relative z-10 space-y-4 pb-12">
                <MovieCarousel title="Tendances Actuelles" movies={moviesData} likedMovies={likedMovies} onToggleLike={toggleLike} />
                <MovieFilter movies={moviesData} onFilter={setFilteredMovies} likedMovies={likedMovies} />
                
                <MovieList title="Catalogue" movies={filteredMovies} likedMovies={likedMovies} onToggleLike={toggleLike} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
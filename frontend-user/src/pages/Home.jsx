import { useState } from 'react';
import moviesData from '../data/movies.json';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import MovieFilter from '../components/movies/MovieFilter';
import Footer from '../components/layout/Footer';

function Home() {
    const [movies, setMovies] = useState(moviesData);
    const [cart, setCart] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);

    const addToCart = (movie) => {
        if (!cart.find(item => item.id === movie.id)) {
            setCart([...cart, movie]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const toggleLike = (movieId) => {
        if (likedMovies.includes(movieId)) {
            setLikedMovies(likedMovies.filter(id => id !== movieId));
        } else {
            setLikedMovies([...likedMovies, movieId]);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar 
                movies={moviesData} 
                cartItems={cart} 
                onRemove={removeFromCart} 
            />
            
            <MovieHero movie={moviesData[0]} />
            
            <div className="-mt-16 relative z-10 space-y-10 pb-20">
                <MovieFilter movies={moviesData} onFilter={setMovies} likedMovies={likedMovies} />
                
                <MovieCarousel 
                    title="Films disponibles" 
                    movies={movies} 
                    onAddToCart={addToCart}
                    likedMovies={likedMovies}
                    onToggleLike={toggleLike}
                />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
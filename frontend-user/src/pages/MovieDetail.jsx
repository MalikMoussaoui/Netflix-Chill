import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import moviesData from '../data/movies.json';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, isInCart, rentMovie, isRented } = useCart();
    const { isAuthenticated } = useAuth();

    const movie = moviesData.find(m => m.id === parseInt(id));

    if (!movie) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Film non trouvé</h2>
                <button onClick={() => navigate('/')} className="bg-red-600 px-6 py-2 rounded">
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(movie);
    };

    const handleRentNow = () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        const result = rentMovie(movie);
        if (result.success) {
            navigate('/my-rentals');
        }
    };

    const alreadyInCart = isInCart(movie.id);
    const alreadyRented = isRented(movie.id);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar movies={moviesData} />
            
            <div className="relative pt-24 pb-12 px-4 border-b border-gray-800">
                <div className="absolute inset-0 z-0">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-20 blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    <Breadcrumb movieTitle={movie.title} category={movie.genre} />
                    
                    <div className="flex flex-col md:flex-row gap-8 mt-8">
                        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                            <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-2xl" />
                        </div>
                        
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                                <span className="bg-red-600 text-white px-2 py-1 rounded font-bold">{movie.rating}/10</span>
                                <span>{movie.year}</span>
                                <span>{movie.duration} min</span>
                                <span className="border border-gray-600 px-2 py-1 rounded">{movie.genre}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl">
                                {movie.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={handleRentNow}
                                    disabled={alreadyRented}
                                    className={`px-8 py-3 rounded font-bold transition-colors ${alreadyRented ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                >
                                    {alreadyRented ? 'Déjà loué' : `Louer maintenant - ${movie.price}€`}
                                </button>
                                
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={alreadyInCart || alreadyRented}
                                    className={`px-8 py-3 rounded font-bold transition-colors ${alreadyInCart || alreadyRented ? 'bg-gray-800 text-green-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                                >
                                    {alreadyRented ? 'Déjà loué' : alreadyInCart ? '✓ Dans le panier' : '+ Ajouter au panier'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MovieDetail;
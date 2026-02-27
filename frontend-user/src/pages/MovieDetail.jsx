import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    const movie = moviesData.find(m => m.id === parseInt(id));

    const handleRent = () => {
        const user = localStorage.getItem('user');
        
        if (!user) {
            navigate('/login');
            return;
        }

        const rental = {
            ...movie,
            rentalDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        const existingRentals = JSON.parse(localStorage.getItem('rentals')) || [];
        const alreadyRented = existingRentals.some(r => r.id === movie.id);
        
        if (alreadyRented) {
            setNotification({ type: 'error', message: 'Vous avez déjà loué ce film' });
            return;
        }

        const newRentals = [...existingRentals, rental];
        localStorage.setItem('rentals', JSON.stringify(newRentals));
        
        setNotification({ type: 'success', message: 'Film loué avec succès !' });
        
        setTimeout(() => {
            navigate('/my-rentals');
        }, 2000);
    };

    if (!movie) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Film introuvable</h1>
                <p className="text-gray-400 mb-8">La page que vous recherchez n'existe pas.</p>
                <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar movies={moviesData} cartItems={[]} onRemove={() => {}} />

            {notification && (
                <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 text-white font-bold ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {notification.message}
                </div>
            )}

            <div className="relative h-[50vh] w-full">
                <div className="absolute inset-0">
                    <img 
                        src={movie.backdrop} 
                        alt={movie.title} 
                        className="w-full h-full object-cover opacity-40" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>
                
                <div className="absolute top-24 left-4 md:left-10 z-10">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Retour</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                        <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-full rounded-lg shadow-2xl border border-gray-800" 
                        />
                    </div>
                    
                    <div className="flex flex-col justify-end pt-4 md:pt-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                        
                        <div className="flex items-center flex-wrap gap-4 mb-6 text-sm">
                            <span className="text-green-400 font-bold">{movie.rating}/10</span>
                            <span className="text-gray-300">{movie.year}</span>
                            <span className="text-gray-300">{movie.duration} min</span>
                            <span className="border border-gray-600 px-2 py-1 rounded text-gray-300">
                                {movie.genre}
                            </span>
                        </div>
                        
                        <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl">
                            {movie.description}
                        </p>
                        
                        <div className="flex gap-4">
                            <Button size="lg" className="shadow-red-600/20" onClick={handleRent}>
                                Louer pour {movie.price}€
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
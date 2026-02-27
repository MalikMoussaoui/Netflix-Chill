import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import moviesData from '../data/movies.json';

function MyRentals() {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('rentals');
        if (storedData) {
            try {
                setRentals(JSON.parse(storedData));
            } catch (error) {
                console.error("Erreur de lecture du localStorage", error);
                setRentals([]);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar movies={moviesData} cartItems={[]} onRemove={() => {}} />

            <div className="container mx-auto px-4 pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-10">Mes locations</h1>
                
                {rentals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 mt-10">
                        <svg className="w-24 h-24 text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        <h2 className="text-xl text-gray-400 mb-8 font-medium">Aucune location pour le moment</h2>
                        <Link to="/">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors">
                                Découvrir des films
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {rentals.map((movie) => (
                            <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform hover:scale-105">
                                <img src={movie.poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-sm truncate text-white mb-1">{movie.title}</h3>
                                    <p className="text-xs text-gray-400">
                                        Expire le : {new Date(movie.expiryDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyRentals;
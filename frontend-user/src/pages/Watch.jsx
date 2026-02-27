import React from 'react';
import { useParams, Link } from 'react-router-dom';
import movies from '../data/movies.json';

function Watch() {
    const { id } = useParams();
    // On convertit l'ID de l'URL (string) en nombre pour trouver le film
    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie) {
        return (
            <div className="h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-2xl">Film introuvable</h1>
                <Link to="/" className="ml-4 text-red-600 hover:underline">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black flex flex-col relative">
            {/* Bouton retour */}
            <div className="absolute top-6 left-6 z-50">
                <Link to="/" className="text-white text-lg font-bold flex items-center hover:text-gray-300 transition-colors bg-black/50 px-4 py-2 rounded-full">
                    <span className="mr-2">←</span> Retour
                </Link>
            </div>

            {/* Simulation du lecteur */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                {/* Image de fond floue pour l'ambiance */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl"
                    style={{ backgroundImage: `url(${movie.backdrop})` }}
                ></div>
                
                <div className="z-10 w-full max-w-5xl px-4">
                    <div className="aspect-video bg-black border border-gray-800 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden group">
                        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                        <button className="absolute bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl hover:bg-red-700 transition-transform transform hover:scale-110 shadow-lg pl-2">▶</button>
                    </div>
                    <h1 className="text-white text-3xl font-bold mt-6 text-center">{movie.title}</h1>
                </div>
            </div>
        </div>
    );
}

export default Watch;
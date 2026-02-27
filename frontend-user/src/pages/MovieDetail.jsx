import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';

function MovieDetail() {
    // 1. On extrait l'ID depuis l'URL (ex: /movie/3 -> id = "3")
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. On cherche le film qui correspond à cet ID dans notre fichier JSON
    // Attention: l'id de l'URL est une chaîne de caractères, on le convertit en nombre avec parseInt
    const movie = moviesData.find(m => m.id === parseInt(id));

    // 3. Gestion d'erreur : Si on tape un ID qui n'existe pas
    if (!movie) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Film introuvable</h1>
                <p className="text-gray-400 mb-8">La page que vous recherchez n'existe pas.</p>
                <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
            </div>
        );
    }

    // 4. Affichage normal si le film est trouvé
    return (
        <div className="min-h-screen bg-black text-white">
            {/* On réutilise la Navbar */}
            <Navbar movies={moviesData} cartItems={[]} onRemove={() => {}} />

            {/* Bannière Background */}
            <div className="relative h-[50vh] w-full">
                <div className="absolute inset-0">
                    <img 
                        src={movie.backdrop} 
                        alt={movie.title} 
                        className="w-full h-full object-cover opacity-40" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>
                
                {/* Bouton retour (utilise navigate(-1) pour revenir à la page précédente) */}
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

            {/* Contenu principal (Affiche + Informations) */}
            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Affiche du film */}
                    <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                        <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-full rounded-lg shadow-2xl border border-gray-800" 
                        />
                    </div>
                    
                    {/* Infos textuelles */}
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
                            <Button size="lg" className="shadow-red-600/20">
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
import React from 'react';
import Button from '../common/Button';

function MovieHero({ movie }) {
    if (!movie) return null;

    return (
        <div className="relative h-[80vh] w-full text-white">
            
            <div className="absolute inset-0">
                <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{movie.title}</h1>
                    
                    <div className="flex items-center space-x-4 mb-6 text-gray-300">
                        <span className="text-green-400 font-bold">{movie.rating} recommandé</span>
                        <span>{movie.year}</span>
                        <span className="border border-gray-500 px-2 rounded text-sm">{movie.genre}</span>
                    </div>

                    <p className="text-lg text-gray-300 mb-8 line-clamp-3 leading-relaxed max-w-xl">
                        {movie.description}
                    </p>

                    <div className="flex space-x-4">
                        <Button size="lg" className="flex items-center">
                            Lecture
                        </Button>
                        <Button variant="secondary" size="lg" className="flex items-center">
                            Plus d'infos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieHero;
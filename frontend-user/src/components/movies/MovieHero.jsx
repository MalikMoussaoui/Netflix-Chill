import React from 'react';
import Button from '../common/Button';

function MovieHero({ movie }) {
    if (!movie) return null;

    return (
        <div className="relative h-[80vh] w-full text-white">
            {/* Image de fond */}
            <div className="absolute inset-0">
                <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            {/* Contenu */}
            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                        {movie.title}
                    </h1>
                    <div className="flex items-center space-x-4 mb-6 text-gray-300">
                        <span className="text-green-400 font-bold">
                            {movie.rating} recommandé
                        </span>
                        <span>{movie.year}</span>
                        <span className="border border-gray-500 px-2 rounded text-sm">
                            {movie.genre}
                        </span>
                    </div>
                    <p className="text-lg text-gray-300 mb-8 line-clamp-3 leading-relaxed max-w-xl">
                        {movie.description}
                    </p>
                    <div className="flex space-x-4">
                        <Button size="lg" className="flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            Lecture
                        </Button>
                        <Button variant="secondary" size="lg" className="flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Plus d'infos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieHero;
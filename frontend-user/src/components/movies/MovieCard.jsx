import React from 'react';
import Button from '../common/Button';

function MovieCard({ movie }) {
    // Couleurs par genre (Bonus)
    const genreColors = {
        'Action': 'bg-red-500',
        'Science-Fiction': 'bg-purple-500',
        'Thriller': 'bg-gray-500',
        'Comédie': 'bg-yellow-500'
    };

    return (
        <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 min-w-[200px]">
            <div className="relative aspect-[2/3]">
                <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover" 
                />
                {/* Note */}
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-yellow-400">
                    {movie.rating}
                </div>
                {/* Badge Genre (Bonus) */}
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${genreColors[movie.genre] || 'bg-gray-600'}`}>
                    {movie.genre}
                </div>
            </div>

            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold text-white mb-1">
                    {movie.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                    {movie.description}
                </p>
                <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs">
                        Lecture
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
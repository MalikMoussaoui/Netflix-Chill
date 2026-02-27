import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const genreColors = {
    'Action': 'bg-red-500',
    'Science-Fiction': 'bg-purple-500',
    'Thriller': 'bg-gray-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Crime': 'bg-orange-700'
};

function MovieCard({ movie, onAddToCart }) {
    const { id, title, poster, rating, genre, description, year, duration, price } = movie;
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${id}`);
    };

    const handleRent = (e) => {
        e.stopPropagation();
        if (onAddToCart) onAddToCart(movie);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group/card relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 w-full bg-gray-900"
        >
            <div className="relative aspect-[2/3] w-full">
                <img 
                    src={poster} 
                    alt={title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-yellow-400">
                    {rating}
                </div>
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${genreColors[genre] || 'bg-gray-600'}`}>
                    {genre}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-sm font-bold text-white mb-1 truncate">{title}</h3>
                
                <div className="flex items-center space-x-2 text-[10px] text-gray-300 mb-2">
                    <span className="text-green-400 font-bold">{rating}/10</span>
                    <span>{year}</span>
                    <span>{duration} min</span>
                </div>

                <p className="text-[10px] text-gray-400 line-clamp-2 leading-snug">{description}</p>
                
                <div className="flex flex-row items-center justify-between gap-2 mt-4 w-full">
                    <Button size="sm" className="flex-1 truncate" onClick={handleRent}>
                        Louer {price}€
                    </Button>
                    
                    <Button 
                        variant={isLiked ? "primary" : "outline"} 
                        size="sm" 
                        className="w-10 flex-shrink-0 px-0" 
                        onClick={handleLike}
                    >
                        {isLiked ? '❤️' : '+'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
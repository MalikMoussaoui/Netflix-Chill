import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function MovieHero({ movie }) {
    const navigate = useNavigate();

    if (!movie) return null;

    const { id, title, backdrop, rating, year, duration, genre, description, price } = movie;

    const handleMoreInfo = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="relative h-[80vh] w-full text-white">
            <div className="absolute inset-0">
                <img 
                    src={backdrop} 
                    alt={title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl pt-20">
                    <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
                        {title}
                    </h1>
                    <div className="flex items-center flex-wrap gap-3 mb-6">
                        <span className="bg-primary px-3 py-1 rounded text-sm font-bold bg-red-600">
                            {rating}/10
                        </span>
                        <span className="text-gray-300">
                            {year}
                        </span>
                        <span className="text-gray-300">
                            {duration} min
                        </span>
                        <span className="border border-gray-500 px-2 py-0.5 text-sm rounded">
                            {genre}
                        </span>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 leading-relaxed drop-shadow-lg">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="shadow-2xl">
                            Louer pour {price}€
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleMoreInfo}>
                            Plus d'infos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieHero;
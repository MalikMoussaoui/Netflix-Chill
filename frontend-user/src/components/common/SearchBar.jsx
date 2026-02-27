import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movies from '../../data/movies.json';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            e.preventDefault();
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    const suggestions = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    return (
        <div className="relative search-bar-container">
            <input
                type="text"
                placeholder="Rechercher..."
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
            />
            
            {showSuggestions && searchTerm.length >= 2 && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-700 mt-1 rounded shadow-lg z-50 overflow-hidden">
                    {suggestions.map(movie => (
                        <div 
                            key={movie.id}
                            className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-none"
                            onClick={() => {
                                navigate(`/movie/${movie.id}`);
                                setShowSuggestions(false);
                                setSearchTerm('');
                            }}
                        >
                            <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded mr-3" />
                            <span className="text-white text-sm font-medium">{movie.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

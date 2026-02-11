import { useState, useEffect } from 'react';

function SearchBar({ movies = [], onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) onSearch(value);
    };

    useEffect(() => {
        if (movies.length > 0 && searchTerm.length >= 1) {
            const results = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(results.slice(0, 5));

        } else {
            setSuggestions([]);
        }
    }, [searchTerm, movies]);

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Rechercher un film..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-red-600 transition-colors"
                />
            </div>

            {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-700 mt-1 rounded-lg shadow-xl z-50 overflow-hidden">
                    {suggestions.map(movie => (
                        <div 
                            key={movie.id} 
                            className="p-3 hover:bg-gray-800 cursor-pointer flex items-center space-x-3 border-b border-gray-800 last:border-0 transition-colors"
                        >
                            <img src={movie.poster} className="w-10 h-14 object-cover rounded" alt={movie.title} />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">{movie.title}</span>
                                <span className="text-xs text-gray-400">{movie.year} • {movie.genre}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import moviesData from '../data/movies.json';
import Navbar from '../components/common/Navbar';
import MovieCard from '../components/movies/MovieCard';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const results = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genre.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(results);
    }, [query]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar movies={moviesData} cartItems={[]} onRemove={() => {}} />
            
            <div className="container mx-auto px-4 pt-32 pb-20">
                <h1 className="text-3xl font-bold mb-2">Résultats pour "{query}"</h1>
                <p className="text-gray-400 mb-8">{filteredMovies.length} film(s) trouvé(s)</p>

                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">Aucun résultat ne correspond à votre recherche.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
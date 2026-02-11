import { useState, useEffect } from 'react';

function MovieFilter({ movies, onFilter, likedMovies }) {
    const [selected, setSelected] = useState('all');

    const genres = ['all', 'likes', ...new Set(movies.map(m => m.genre))];

    const handleFilter = (genre) => {
        setSelected(genre);
        let filtered;
        if (genre === 'all') {
            filtered = movies;
        } else if (genre === 'likes') {
            filtered = movies.filter(m => likedMovies.includes(m.id));
        } else {
            filtered = movies.filter(m => m.genre === genre);
        }
        onFilter(filtered);
    };

    useEffect(() => {
        if (selected === 'likes') {
            onFilter(movies.filter(m => likedMovies.includes(m.id)));
        }
    }, [likedMovies, selected, movies, onFilter]);

    return (
        <div className="flex gap-2 p-4 overflow-x-auto">
            {genres.map(g => (
                <button
                    key={g}
                    onClick={() => handleFilter(g)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selected === g ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                    {g === 'all' ? 'Tout' : g === 'likes' ? 'Mes Likes' : g}
                </button>
            ))}
        </div>
    );
}

export default MovieFilter;

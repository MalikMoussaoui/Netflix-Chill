import { useState } from 'react';

function MovieFilter({ movies, onFilter }) {
    const [selected, setSelected] = useState('all');

    const genres = ['all', ...new Set(movies.map(m => m.genre))];

    const handleFilter = (genre) => {
        setSelected(genre);
        const filtered = genre === 'all'
            ? movies
            : movies.filter(m => m.genre === genre);
        onFilter(filtered);
    };

    return (
        <div className="flex gap-2 p-4 overflow-x-auto">
            {genres.map(g => (
                <button
                    key={g}
                    onClick={() => handleFilter(g)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selected === g ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                    {g === 'all' ? 'Tout' : g}
                </button>
            ))}
        </div>
    );
}

export default MovieFilter;

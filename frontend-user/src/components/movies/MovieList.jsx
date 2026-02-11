import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ title, movies, likedMovies, onToggleLike }) {
    return (
        <section className="py-8 px-4">
            <h2 className="text-2xl font-bold text-white mb-6 hover:text-gray-300 cursor-pointer transition">
                {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} isLiked={likedMovies?.includes(movie.id)} onToggleLike={onToggleLike} />
                ))}
            </div>
        </section>
    );
}

export default MovieList;
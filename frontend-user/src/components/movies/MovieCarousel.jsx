import { useState, useRef } from 'react';
import MovieCard from './MovieCard';

function MovieCarousel({ title, movies, likedMovies, onToggleLike }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = container.clientWidth * 0.8;

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)); // -10 pour la marge d'erreur
        }
    };

    return (
        <section className="py-8 relative group px-4">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            
            {/* Bouton Gauche */}
            {canScrollLeft && (
                <button 
                    onClick={() => scroll("left")} 
                    className="absolute left-0 top-0 z-10 bg-black/70 p-2 h-full text-white hover:bg-white hover:text-black transition opacity-0 group-hover:opacity-100 flex items-center"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Container */}
            <div 
                ref={scrollContainerRef} 
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4" 
                style={{ scrollbarWidth: 'none' }}
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="shrink-0 w-48">
                        <MovieCard movie={movie} isLiked={likedMovies?.includes(movie.id)} onToggleLike={onToggleLike} />
                    </div>
                ))}
            </div>

            {/* Bouton Droite */}
            {canScrollRight && (
                <button 
                    onClick={() => scroll("right")} 
                    className="absolute right-0 top-0 z-10 bg-black/70 p-2 h-full text-white hover:bg-white hover:text-black transition opacity-0 group-hover:opacity-100 flex items-center"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </section>
    );
}

export default MovieCarousel;
import { useState, useRef } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies, onAddToCart }) {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.8;
        const newScrollPosition = direction === "left" 
            ? container.scrollLeft - scrollAmount 
            : container.scrollLeft + scrollAmount;
            
        container.scrollTo({
            left: newScrollPosition,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-8 relative group">
            <h2 className="text-2xl font-bold mb-6 px-4">{title}</h2>
            
            <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 z-10 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto px-4 scrollbar-hide pb-4"
                style={{ scrollbarWidth: "none" }}
            >
                {movies.map(movie => (
                    <div key={movie.id} className="shrink-0 w-48 sm:w-56"> 
                        <MovieCard 
                            movie={movie} 
                            onAddToCart={onAddToCart}
                        />
                    </div>
                ))}
            </div>

            <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 z-10 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </section>
    );
}

export default MovieCarousel;
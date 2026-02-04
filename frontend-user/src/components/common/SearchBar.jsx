import { useState } from 'react';

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="relative flex items-center">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="hover:text-gray-300 transition-colors mr-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
            </button>
            {isOpen && (
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-48 px-3 py-1 bg-black/80 border border-white/30 rounded text-sm text-white focus:outline-none focus:border-red-600 transition-all duration-300"
                    autoFocus
                />
            )}
        </div>
    );
}

export default SearchBar;
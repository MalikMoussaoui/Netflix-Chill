import React, { useState, useEffect } from 'react';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Effet pour détecter le scroll et changer la couleur de fond
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
            isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo & Liens */}
                <div className="flex items-center space-x-8">
                    <h1 className="text-primary text-3xl font-bold tracking-tight cursor-pointer">NETFLIX</h1>
                    <ul className="hidden md:flex space-x-6 text-gray-300">
                        <li className="hover:text-white cursor-pointer transition">Accueil</li>
                        <li className="hover:text-white cursor-pointer transition">Séries</li>
                        <li className="hover:text-white cursor-pointer transition">Films</li>
                        <li className="hover:text-white cursor-pointer transition">Nouveautés</li>
                    </ul>
                </div>

                {/* Partie Droite (Recherche, Avatar) */}
                <div className="flex items-center space-x-4 text-white">
                    <button className="hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold cursor-pointer">
                        U
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import SearchBar from './SearchBar';
import CartButton from './CartButton';

function Navbar({ movies, cartItems, onRemove }) {
    return (
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent transition-colors duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-red-600 text-3xl font-bold tracking-tight">NETZLUX</h1>
                        <ul className="hidden md:flex space-x-6 text-sm font-medium">
                            <li><a href="#" className="hover:text-gray-300 transition-colors">Accueil</a></li>
                            <li><a href="#" className="hover:text-gray-300 transition-colors">Films</a></li>
                            <li><a href="#" className="hover:text-gray-300 transition-colors">Mes locations</a></li>
                        </ul>
                    </div>
                    
                    <div className="flex items-center space-x-5">
                        <SearchBar movies={movies} />
                        <CartButton cartItems={cartItems} onRemove={onRemove} />
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer">
                            <span className="text-sm font-bold">U</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
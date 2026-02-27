import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartButton from './CartButton';

function Navbar({ movies, cartItems, onRemove }) {
    return (
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent transition-colors duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        {/* Le logo ramène à l'accueil avec Link */}
                        <Link to="/">
                            <h1 className="text-red-600 text-3xl font-bold tracking-tight">NETZLUX</h1>
                        </Link>
                        
                        <ul className="hidden md:flex space-x-6 text-sm font-medium">
                            <li>
                                {/* NavLink permet d'appliquer un style différent si la page est active */}
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => isActive ? 'text-red-600 font-bold' : 'text-gray-300 hover:text-white transition-colors'}
                                >
                                    Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/my-rentals" 
                                    className={({ isActive }) => isActive ? 'text-red-600 font-bold' : 'text-gray-300 hover:text-white transition-colors'}
                                >
                                    Mes locations
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex items-center space-x-5">
                        <SearchBar movies={movies} />
                        <CartButton cartItems={cartItems} onRemove={onRemove} />
                        
                        {/* L'icône utilisateur amène vers la page Login */}
                        <Link to="/login">
                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition">
                                <span className="text-sm font-bold">U</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartButton() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <div className="relative">
            <Link to="/cart">
                <button className="text-gray-300 hover:text-white transition-colors relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </Link>
        </div>
    );
}

export default CartButton;
import React, { useState } from 'react';

function CartButton({ cartItems, onRemove }) {
    const [showCart, setShowCart] = useState(false);

    const cartCount = cartItems.length;

    return (
        <div className="relative flex">
            <button 
                onClick={() => setShowCart(!showCart)}
                className="relative hover:text-gray-300 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white">
                        {cartCount}
                    </span>
                )}
            </button>

            {showCart && cartItems.length > 0 && (
                <div className="absolute right-0 mt-10 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-4 z-50">
                    <h3 className="text-white font-bold mb-3 border-b border-gray-800 pb-2 text-sm uppercase">Ma Sélection</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                        {cartItems.map(item => (
                            <div 
                                key={item.id} 
                                onDoubleClick={() => onRemove(item.id)}
                                className="flex items-center justify-between group cursor-pointer p-1 rounded hover:bg-gray-800 transition"
                            >
                                <span className="text-xs text-gray-300 truncate pr-2">{item.title}</span>
                                <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition">Supprimer</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartButton;
import React, { useState } from 'react';
import Button from './Button';

function CartButton({ cartItems, onRemove }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 p-4">
                    <h3 className="text-white font-bold mb-3">Mon Panier</h3>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-400 text-sm">Votre panier est vide</p>
                    ) : (
                        <div className="space-y-3">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <img src={item.poster} alt={item.title} className="w-8 h-12 object-cover rounded" />
                                        <div className="flex flex-col">
                                            <span className="text-white text-sm font-medium truncate w-32">{item.title}</span>
                                            <span className="text-gray-400 text-xs">{item.price}€</span>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <div className="border-t border-gray-700 pt-3 mt-3">
                                <div className="flex justify-between text-white font-bold mb-3">
                                    <span>Total</span>
                                    <span>{cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}€</span>
                                </div>
                                <Button className="w-full">Payer</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartButton;
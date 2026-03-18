import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedRentals = localStorage.getItem('rentals');
        
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedRentals) setRentals(JSON.parse(storedRentals));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('rentals', JSON.stringify(rentals));
    }, [rentals]);

    const addToCart = (movie) => {
        setCart(prev => {
            if (prev.find(item => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromCart = (movieId) => {
        setCart(prev => prev.filter(item => item.id !== movieId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const getCartCount = () => {
        return cart.length;
    };

    const rentMovie = (movie) => {
        const rentalDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        const rental = {
            id: Date.now(),
            poster: movie.poster,
            movieId: movie.id,
            title: movie.title,
            price: movie.price,
            rentalDate: rentalDate.toISOString(),
            expiryDate: expiryDate.toISOString()
        };

        setRentals(prev => [...prev, rental]);
        removeFromCart(movie.id);

        return { success: true, rental };
    };

    const rentAllInCart = () => {
        const newRentals = cart.map((movie, index) => {
            const rentalDate = new Date();
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);

            return {
                id: Date.now() + index,
                poster: movie.poster,
                movieId: movie.id,
                title: movie.title,
                price: movie.price,
                rentalDate: rentalDate.toISOString(),
                expiryDate: expiryDate.toISOString()
            };
        });

        setRentals(prev => [...prev, ...newRentals]);
        clearCart();

        return { success: true, count: newRentals.length };
    };

    const isRented = (movieId) => {
        return rentals.some(rental => rental.movieId === movieId && new Date(rental.expiryDate) > new Date());
    };

    const getRentalByMovieId = (movieId) => {
        return rentals.find(rental => rental.movieId === movieId && new Date(rental.expiryDate) > new Date());
    };

    const isInCart = (movieId) => {
        return cart.some(item => item.id === movieId);
    };

    const value = {
        cart,
        rentals,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        rentMovie,
        rentAllInCart,
        isRented,
        getRentalByMovieId,
        isInCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
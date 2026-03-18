import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MyRentals from './pages/MyRentals';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SearchPage from './pages/SearchPage';
import Cart from './pages/Cart';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/cart" element={<Cart />} />
                        
                        <Route 
                            path="/my-rentals" 
                            element={
                                <ProtectedRoute>
                                    <MyRentals />
                                </ProtectedRoute>
                            } 
                        />
                        
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
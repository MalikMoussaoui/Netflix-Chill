import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser = {
                id: Date.now(),
                email: email,
                name: email.split('@')[0],
                avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser = {
                id: Date.now(),
                email: email,
                name: name,
                avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const value = { user, loading, login, register, logout, isAuthenticated, updateProfile };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
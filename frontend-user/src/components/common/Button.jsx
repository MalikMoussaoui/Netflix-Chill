import React from 'react';

function Button({ children, variant = 'primary', size = 'md', onClick, className = '', type = 'button' }) {
    const baseClasses = 'font-semibold rounded transition-all duration-300 inline-flex items-center justify-center text-center';
    
    const variants = {
        primary: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
        secondary: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm',
        outline: 'border-2 border-white/50 hover:border-white hover:bg-white/10 text-white'
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
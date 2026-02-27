import React from 'react';

function NotFound() {
    return (
        <div className="text-white pt-24 text-center">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl">Oups ! La page que vous recherchez n'existe pas.</p>
        </div>
    );
}

export default NotFound;
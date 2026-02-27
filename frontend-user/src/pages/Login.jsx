import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function Login() {
    // États pour stocker ce que l'utilisateur tape
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    // Outil de redirection
    const navigate = useNavigate();

    // Vérification des champs avant l'envoi
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email requis";
        if (!formData.password) newErrors.password = "Mot de passe requis";
        return newErrors;
    };

    // Fonction déclenchée au clic sur "Se connecter"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        // Simulation d'un temps de chargement vers un serveur (1 seconde)
        setTimeout(() => {
            // Sauvegarde locale de l'utilisateur (on simule qu'il est connecté)
            localStorage.setItem('user', JSON.stringify({
                email: formData.email,
                name: formData.email.split('@')[0] // Utilise le début de l'email comme nom
            }));
            
            setIsLoading(false);
            
            // Redirection vers la page d'accueil !
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Petit logo en haut à gauche */}
            <div className="p-6">
                <Link to="/">
                    <h1 className="text-red-600 text-4xl font-bold tracking-tight">NETZLUX</h1>
                </Link>
            </div>
            
            {/* Conteneur du formulaire centré */}
            <div className="flex-1 flex justify-center items-center px-4 -mt-20">
                <div className="bg-gray-900/80 p-10 md:p-16 rounded-lg w-full max-w-md shadow-2xl border border-gray-800">
                    <h2 className="text-3xl font-bold mb-8">Se connecter</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email"
                                className={`w-full p-4 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-gray-500`}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <input 
                                type="password" 
                                placeholder="Mot de passe"
                                className={`w-full p-4 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-gray-500`}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded mt-6 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <div className="mt-8 text-gray-400 text-sm">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-white hover:underline">
                            S'inscrire
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;
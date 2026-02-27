import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) newErrors.name = "Nom requis";
        
        if (!formData.email) {
            newErrors.email = "Email requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }
        
        if (!formData.password) {
            newErrors.password = "Mot de passe requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Au moins 6 caractères";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        setTimeout(() => {
            localStorage.setItem("user", JSON.stringify({
                name: formData.name,
                email: formData.email
            }));
            
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <div className="p-6">
                <Link to="/">
                    <h1 className="text-red-600 text-4xl font-bold tracking-tight">NETZLUX</h1>
                </Link>
            </div>
            
            <div className="flex-1 flex justify-center items-center px-4 -mt-20">
                <div className="bg-gray-900/80 p-10 md:p-12 rounded-lg w-full max-w-md shadow-2xl border border-gray-800">
                    <h2 className="text-3xl font-bold mb-8">S'inscrire</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div>
                            <input 
                                type="text" 
                                placeholder="Nom"
                                className={`w-full p-4 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-gray-500`}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

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

                        <div>
                            <input 
                                type="password" 
                                placeholder="Confirmez le Mot de passe"
                                className={`w-full p-4 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-gray-500`}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded mt-6 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Inscription...' : "S'inscrire"}
                        </button>
                    </form>

                    <div className="mt-8 text-gray-400 text-sm">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-white hover:underline">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
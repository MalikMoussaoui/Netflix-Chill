import React from 'react';
import FormInput from './FormInput';

const Formulaire = () => {
    return (
        <div className="container mt-5 p-4 border rounded shadow bg-white text-dark">
            <h2 className="mb-4">Inscription (Exercice TP2)</h2>
            <form>
                {/* On réutilise le composant FormInput 3 fois avec des données différentes */}
                <FormInput label="Nom" type="text" placeholder="Entrez votre nom" />
                <FormInput label="Prénom" type="text" placeholder="Entrez votre prénom" />
                <FormInput label="Email" type="email" placeholder="exemple@mail.com" />
                
                <button type="submit" className="btn btn-primary mt-3">
                    Valider
                </button>
            </form>
        </div>
    );
};

export default Formulaire;
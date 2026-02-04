import React from 'react';

function Footer() {
    return (
        <footer className="bg-black/90 text-gray-500 py-12 px-4 border-t border-gray-800">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <h3 className="mb-4 text-white uppercase font-bold">Navigation</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Accueil</a></li>
                            <li><a href="#" className="hover:underline">Séries</a></li>
                            <li><a href="#" className="hover:underline">Films</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-white uppercase font-bold">Légal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Confidentialité</a></li>
                            <li><a href="#" className="hover:underline">Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-white uppercase font-bold">Aide</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">FAQ</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <p>© 2026 NetZlux</p>
                        <p className="mt-2 text-xs">Fait par Toi</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
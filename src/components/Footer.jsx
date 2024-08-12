import React from 'react';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';


const Footer = () => {
    const handleKnow = () => {
        toast.warning("cette fonctionnalitée n'est pas encore disponible")
    }
    return (
        <footer className="w-full bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center md:flex-row items-center justify-between sm:flex-col">
                <div className="text-center md:text-left mb-2 md:mb-0">
                    <h2 className="text-lg font-bold mb-2 underline">À propos de Sen-learning</h2>
                    <ul className="text-sm list-disc list-inside">
                        <li>Accès à des cours variés</li>
                        <li>Support disponible 24/7</li>
                        <li>Certificats de fin de formation</li>
                        <li>Communauté d'apprenants</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size="2em" className="text-white hover:text-blue-500" />
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size="2em" className="text-white hover:text-blue-500" />
                        </a>
                        <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size="2em" className="text-white hover:text-green-500" />
                        </a>
                    </div>
                    <button onClick={handleKnow} className="flex gap-3 items-center btn-custom border border-white text-white">
                        En savoir plus <FaArrowRight />
                    </button>
                </div>
            </div>
            <p className="text-sm mt-4 text-center">© 2024 sen~learning. Tous droits réservés.</p>
        </footer>
    );
}

export default Footer;

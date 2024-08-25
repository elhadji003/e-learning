import React, { useState } from 'react';
import { useGetMeQuery } from '../../features/auth/authAPI';
import Profile from '../../assets/user.png';
import ProfileModal from '../../components/ProfileModal';
import ModalPwd from '../../components/ModalPwd';

const Profil = () => {
    const { data: user } = useGetMeQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPwd, setIsModalOpenPwd] = useState(false);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 h-48 rounded-lg shadow-lg z-[-1]">
                <img
                    className="w-[150px] h-[150px] rounded-full border-4 border-white absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover bg-white"
                    src={user?.profileImageUrl || Profile}
                    alt="Profile"
                />

            </div>

            <div className="bg-white shadow-md rounded-lg mt-16 p-6 text-center text-nowrap">
                <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">{user?.number}</p>
                <p className="text-indigo-600 font-semibold mt-2">{user?.role}</p>

                <div className="flex justify-center mt-6 space-x-4 sm:space-x-1 sm:scale-[0.9]">
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 sm:text-[10px] rounded hover:bg-indigo-600 transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Modifier le Profil
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 sm:text-[10px] rounded hover:bg-gray-600 transition"
                        onClick={() => setIsModalOpenPwd(true)}
                    >
                        Modifier le Mot de Passe
                    </button>
                </div>
            </div>

            {/* Informations Personnelles Complètes */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Informations Personnelles</h3>
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex-1 min-w-[250px] space-y-3">
                        <div>
                            <p className="text-gray-600">Prénom(s) et Nom(s):</p>
                            <p className="text-gray-800 font-medium">{user?.username}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email:</p>
                            <p className="text-gray-800 font-medium">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Téléphone:</p>
                            <p className="text-gray-800 font-medium">{user?.number}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Status:</p>
                            <p className="text-gray-800 font-medium">{user?.role}</p>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[250px] space-y-3">
                        <div>
                            <p className="text-gray-600">Adresse:</p>
                            <p className="text-gray-800 font-medium">{user?.address || 'Non renseigné'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Ville:</p>
                            <p className="text-gray-800 font-medium">{user?.ville || 'Non renseigné'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Pays:</p>
                            <p className="text-gray-800 font-medium">{user?.pays || 'Non renseigné'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Code Postal:</p>
                            <p className="text-gray-800 font-medium">{user?.code_postal || 'Non renseigné'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour modifier le profil */}
            <ProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
            />
            {/* Modal pour modifier le mot de passe */}
            <ModalPwd
                isOpen={isModalOpenPwd}
                onClose={() => setIsModalOpenPwd(false)}
            />

        </div>
    );
};

export default Profil;

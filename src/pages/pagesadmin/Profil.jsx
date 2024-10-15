import React, { useState } from 'react';
import { useDeleteMeAccountMutation, useGetMeQuery, useUpdateProfileImageMutation } from '../../features/auth/authAPI';
import Profile from '../../assets/user.png';
import ProfileModal from '../../components/ProfileModal';
import ModalPwd from '../../components/ModalPwd';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profil = () => {
    const { data: user } = useGetMeQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPwd, setIsModalOpenPwd] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updateProfileImageMutation] = useUpdateProfileImageMutation();
    const [deleteMeAccount] = useDeleteMeAccountMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state for profile image
    const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || Profile);

    const handleDeleteAccount = async () => {
        try {
            await deleteMeAccount().unwrap();
            dispatch(logOut());
            navigate('/');
            console.log('Compte supprimé');
        } catch (error) {
            console.error('Erreur lors de la suppression du compte', error);
        }
    };

    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('profileImage', event.target.files[0]);

        try {
            const response = await updateProfileImageMutation(formData).unwrap();

            // Update local state with the new image URL
            setProfileImageUrl(response.profileImageUrl);
            toast.success('Image de profil mise à jour avec succès');
        } catch (error) {
            toast.error('Échec de la mise à jour de l\'image de profil');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 h-48 rounded-lg shadow-lg">
                <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-1 bg-gradient-to-r from-indigo-600 to-purple-500">
                    <img
                        className="w-[150px] h-[150px] rounded-full bg-white object-cover"
                        src={profileImageUrl}
                        alt="Profile"
                    />
                    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300 cursor-pointer">
                        <FaPencilAlt className="text-indigo-600" />
                        <input
                            type='file'
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg mt-16 p-6 text-center text-nowrap">
                <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">{user?.number}</p>
                <p className="text-indigo-600 font-semibold mt-2">{user?.role}</p>

                <div className="flex justify-center mt-6 space-x-4 sm:space-x-1 z-[-1]">
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

            <div className="mt-8 text-center">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    Supprimer mon compte
                </button>
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
            {/* Modal de confirmation de suppression */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
                        <p className="mb-6">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                onClick={handleDeleteAccount}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../features/users/usersAPI';
import { useGetMeQuery } from '../features/auth/authAPI';
import { toast } from 'react-toastify';

const ProfileModal = ({ isOpen, onClose, user }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: user?.username || '',
            email: user?.email || '',
            number: user?.number || '',
            role: user?.role || '',
            address: user?.address || '',
            ville: user?.ville || '',
            pays: user?.pays || '',
            code_postal: user?.code_postal || '',
        }
    });

    const [updateUser] = useUpdateUserMutation();
    const { data: userData, refetch } = useGetMeQuery();
    const id = userData?._id;
    console.log("ID", id);

    const onSubmit = async (data) => {
        if (!id) {
            console.error("User ID is not available");
            return;
        }
        try {
            await updateUser({ id, ...data });
            toast.success("Votre profil a été modifié avec succée")
            await refetch();
            onClose();
        } catch (error) {
            toast.error("Une erreur a été rencontrée")
            console.error("Error updating user:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Modifier le Profil</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Prénom(s) et Nom(s):</label>
                                <input
                                    type="text"
                                    {...register('username')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Email:</label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Téléphone:</label>
                                <input
                                    type="text"
                                    {...register('number')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Statut:</label>
                                <input
                                    type="text"
                                    {...register('role')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Adresse:</label>
                                <input
                                    type="text"
                                    {...register('address')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Ville:</label>
                                <input
                                    type="text"
                                    {...register('ville')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Pays:</label>
                                <input
                                    type="text"
                                    {...register('pays')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Code Postal:</label>
                                <input
                                    type="text"
                                    {...register('code_postal')}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;

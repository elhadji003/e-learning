import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../features/auth/authAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { Checkbox } from "@headlessui/react";

const ModalPwd = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updatePassword] = useUpdatePasswordMutation();
    const [showPwd, setShowPwd] = useState(false)

    const onSubmit = async (data) => {
        try {
            const response = await updatePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            toast.success("Mot de passe mis à jour avec succès");
            onClose(); // Fermer le modal après la mise à jour
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du mot de passe");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Modifier le mot de passe</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Mot de passe actuel:</label>
                            <input
                                type={showPwd ? 'text' : 'password'}
                                {...register('currentPassword', { required: "Mot de passe actuel requis" })}
                                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Nouveau mot de passe:</label>
                            <input
                                type={showPwd ? 'text' : 'password'}
                                {...register('newPassword', { required: "Nouveau mot de passe requis" })}
                                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={showPwd}
                            onChange={() => setShowPwd(!showPwd)}
                            className="cursor-pointer"
                        />
                        <label className="block text-gray-700 font-medium cursor-pointer">
                            Voir les mots de passe
                        </label>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
                        >
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalPwd;

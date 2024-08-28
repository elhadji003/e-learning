import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitBtn from '../../components/SubmitBtn';
import { useResetPasswordMutation } from '../../features/auth/authAPI';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ResetPwd = () => {
    const [visible, setVisible] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [resetPwd, { isLoading }] = useResetPasswordMutation();
    const { id: token } = useParams(); // Utilise useParams pour obtenir le token depuis l'URL

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await resetPwd({ token, password: data.password }).unwrap(); // Passe le token ici
            toast.success('Mot de passe réinitialisé avec succès.');
            setVisible(true)
            reset()
        } catch (err) {
            console.log("Error", err);
            toast.error('Échec de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div className="flex flex-col sm:w-full justify-center items-center p-8">
            <div className="w-full max-w-md">
                <h1 className='mb-4 font-extrabold text-3xl text-center sm:text-nowrap sm:text-xl'>Réinitialiser le mot de passe</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="password"
                        {...register('password', { required: 'Mot de passe est requis' })}
                        placeholder="Nouveau mot de passe"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <input
                        type="password"
                        {...register('confirmPassword', { required: 'Confirmation du mot de passe est requise' })}
                        placeholder="Confirmer le nouveau mot de passe"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                    <SubmitBtn type="submit" disabled={isLoading || isSubmitting} className={"w-full"}>
                        {isLoading ? 'Chargement...' : 'Réinitialiser'}
                    </SubmitBtn>
                </form>
                {
                    visible && (
                        <Link to={"/login"} className='underline mt-3'>Se connecter</Link>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
};


export default ResetPwd;

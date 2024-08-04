import React from 'react';
import { useForm } from 'react-hook-form';
import SubmitBtn from '../../components/SubmitBtn';
import '../../styles/animation.css';
import { useForgetPasswordMutation } from '../../features/auth/authAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPwd = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [forgotPwd, { isLoading }] = useForgetPasswordMutation()

    const onSubmit = async (data) => {
        try {
            await forgotPwd(data).unwrap();
            reset();
            toast.success('Un email de réinitialisation a été envoyé.');
        } catch (err) {
            console.log("Error", err);
            toast.error("Échec de l'envoi de l'email de réinitialisation.");
        }
    };

    return (
        <div className="flex flex-col sm:w-full justify-center items-center p-8">
            <div className="w-full max-w-md">
                <h1 className='mb-4 font-extrabold text-3xl text-center'>Mot de passe oublié</h1>
                <p className='mb-8'>
                    Si vous avez oublié votre mot de passe, veuillez entrer votre adresse email ci-dessous.
                    Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="email"
                        {...register('email', { required: 'Email est requis' })}
                        placeholder="Entrer votre email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <SubmitBtn type="submit" disabled={isLoading || isSubmitting} className={"w-full"}>
                        {isLoading ? 'Chargement...' : 'Envoyer'}
                    </SubmitBtn>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPwd;

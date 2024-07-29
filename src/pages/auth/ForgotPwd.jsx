// src/components/LoginComponent.js
import React from 'react';
import { useForm } from 'react-hook-form';
import SubmitBtn from '../../components/SubmitBtn';
import '../../styles/animation.css';

const ForgotPwd = () => {
    const { register, handleSubmit, formState: { errors, isLoading }, reset } = useForm();

    const onSubmit = async () => {
        alert("! ok");
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
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Entrer votre email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <SubmitBtn type="submit" disabled={isLoading} className={"w-full"}>
                        {isLoading ? 'chargement...' : 'Envoyer'}
                    </SubmitBtn>
                </form>
            </div>
        </div>
    );
};

export default ForgotPwd;

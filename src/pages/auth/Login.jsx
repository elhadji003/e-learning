// src/components/LoginComponent.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authAPI';
import { setCredentials } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import SubmitBtn from '../../components/SubmitBtn';
import '../../styles/animation.css';
import { FaBook, FaRegLightbulb, FaUserCog, FaUserGraduate } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            dispatch(setCredentials(userData));
            navigate(userData.user.role === 'admin' ? '/dashboard-admin' : '/dashboard-user');
            reset();
            toast.success("Vous étes connecté avec succée")
        } catch (err) {
            toast.error("Verifier vous identifiants")
            console.error('Failed to login:', err);
        }
    };

    return (
        <div className="flex sm:flex-col">
            <div className="w-1/2 sm:w-full h-screen sm:h-[130px] bg-indigo-600 text-white flex flex-col gap-4 items-center justify-center overflow-hidden relativev sm:rounded-b-xl sm:shadow-xl">
                <h1 className="text-4xl font-extrabold text-center sm:text-[18px]">Bienvenue sur SEN ~ LEARNING</h1>
                <div className="flex flex-wrap">
                    <div className="flex items-center gap-3">
                        <FaBook size={35} />
                        <FaUserGraduate size={35} />
                        <FaRegLightbulb size={35} />
                        <FaUserCog size={35} />
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col sm:w-full justify-center items-center p-8">
                <h1 className='mb-8 font-extrabold text-3xl'>Connectez-vous</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        autoComplete='off'
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                        autoComplete='off'
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <SubmitBtn type="submit" disabled={isLoading} className={"w-full"}>
                        {isLoading ? 'chargement...' : 'Connecter'}
                    </SubmitBtn>
                </form>
                <div className="mt-4 text-center sm:text-nowrap sm:scale-[0.9]">
                    <p>
                        Si vous n'avez pas de compte, <a href="/register" className="font-bold hover:underline">inscrivez-vous ici</a>.
                    </p>
                    <p>
                        Mot de passe oublié? <a href="/forgot-password" className="font-bold hover:underline">Cliquez-ici</a>.
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitBtn from '../../components/SubmitBtn';
import '../../styles/animation.css';
import { useRegisterMutation } from '../../features/auth/authAPI';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { FaBook, FaEye, FaEyeSlash, FaRegLightbulb, FaUserCog, FaUserGraduate } from 'react-icons/fa';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await registerUser(data).unwrap();
            reset();
            toast.success('Registration Successful');
        } catch (err) {
            toast.error('Registration Failed');
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
            <div className="w-1/2 sm:w-full flex flex-col justify-center items-center p-8">
                <h1 className='mb-8 font-extrabold text-3xl'>Inscription</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div className="flex gap-4 sm:flex-col">
                        <div className="w-full">
                            <input
                                type="text"
                                {...register('username', { required: 'Username is required' })}
                                placeholder="Username"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>

                        <div className="w-full">
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 sm:flex-col">
                        <div className="w-full">
                            <select
                                {...register('role', { required: 'Role is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="admin">Administrateur</option>
                                <option value="user">User</option>
                                <option value="enseignant">Enseignant</option>
                            </select>
                            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                        </div>

                        <div className="w-full">
                            <select
                                {...register('level', { required: 'Niveau d\'étude is required' })}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="troisième">troisième</option>
                                <option value="seconde">Seconde</option>
                                <option value="première">Première</option>
                                <option value="terminale">Terminale</option>
                            </select>
                            {errors.level && <p className="text-red-500">{errors.level.message}</p>}
                        </div>
                    </div>

                    <div className="w-full">
                        <input
                            type="tel"
                            {...register('number', { required: 'Phone number is required' })}
                            placeholder="Phone Number"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.number && <p className="text-red-500">{errors.number.message}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <div className="relative w-full">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPwd', { required: 'Confirm Password is required' })}
                            placeholder="Confirm Password"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    {errors.confirmPwd && <p className="text-red-500">{errors.confirmPwd.message}</p>}

                    <SubmitBtn type="submit" disabled={isLoading} className={"w-full"}>
                        {isLoading ? 'Chargement...' : 'S\'inscrire'}
                    </SubmitBtn>
                </form>
                <div className="mt-4 text-center sm:text-nowrap sm:scale-[0.8]">
                    <p>
                        Vous avez déjà un compte? <a href="/login" className="font-bold hover:underline">Connectez-vous ici</a>.
                    </p>
                    <p className='underline text-sm'>
                        En vous inscrivant, vous acceptez nos politiques d'actions.
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;

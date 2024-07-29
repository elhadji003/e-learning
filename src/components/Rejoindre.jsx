import React from 'react';
import SubmitBtn from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { useCreateMessageMutation } from '../features/contact/contactAPI';
import { toast } from 'react-toastify';

const Rejoindre = ({ isOpen, onModalClose }) => {
    const handleModalClose = () => {
        onModalClose();
    };

    if (!isOpen) return null;


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [createMessage] = useCreateMessageMutation();

    const onSubmit = async (data) => {
        try {
            await createMessage(data).unwrap();
            toast.success("Votre message a été bien envoyé")
            reset();
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
        >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-md p-4">
                <div className="relative bg-white rounded-lg shadow-xl border border-t-md">
                    <div className="flex items-center justify-between p-2 text-white bg-indigo-600 border-b rounded-b rounded-lg">
                        <h3 className="text-xl font-semibold">
                            Contactez-nous
                        </h3>
                        <button onClick={handleModalClose}>
                            X
                        </button>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    {...register('fullName', { required: 'Username is required' })}
                                    placeholder="Username"
                                    className="w-full p-2 border border-gray-300 rounded outline-none"
                                />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>
                            <div>
                                <input
                                    {...register("email", { required: 'email is required' })}
                                    type="email"
                                    placeholder="Votre address email"
                                    className="w-full p-2 border border-gray-300 rounded outline-none"

                                />
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>
                            <div>
                                <textarea
                                    rows="6"
                                    {...register("message", { required: 'message is required' })}
                                    placeholder="Message..."
                                    className="w-full p-2 border border-gray-300 rounded outline-none"
                                />
                                {errors.message && <p className="text-red-600">{errors.message.message}</p>}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                <SubmitBtn children={"Envoyé"} className={"w-full"} />
                            </div>
                            <div>
                                <span className="underline font-bold">NB:</span>{" "}
                                <span className='text-sm text-center'>Vos données sont strictement confidentielles et utilisées uniquement dans le cadre de votre demande.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rejoindre;

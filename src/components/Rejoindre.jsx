import React, { useState } from 'react';
import SubmitBtn from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { useCreateMessageMutation } from '../features/contact/contactAPI';

const Rejoindre = ({ isOpen, onModalClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [createMessage] = useCreateMessageMutation();
    const [successMessage, setSuccessMessage] = useState('');

    const handleModalClose = () => {
        onModalClose();
    };

    const onSubmit = async (data) => {
        try {
            await createMessage(data).unwrap();
            reset();
            setSuccessMessage("Message sent successfully!"); // Set success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            // handleModalClose(); // Optionally close the modal on success
        } catch (error) {
            console.error("Failed to send message: ", error);
            setSuccessMessage("Failed to send message."); // Optionally show error message
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
        >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={handleModalClose}></div>
            <div className="relative w-full max-w-md p-4">
                <div className="relative bg-white rounded-lg shadow-xl border border-t-md">
                    <div className="flex items-center justify-between p-4 text-white bg-indigo-600 border-b rounded-t-lg">
                        <h3 className="text-xl font-semibold">Contactez-nous</h3>
                        <button onClick={handleModalClose} aria-label="Close modal">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    {...register('fullName', { required: 'Name is required' })}
                                    placeholder="Votre nom complet"
                                    className="w-full p-2 border border-gray-300 rounded outline-none"
                                />
                                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    {...register("email", { required: 'Email is required' })}
                                    placeholder="Votre adresse email"
                                    className="w-full p-2 border border-gray-300 rounded outline-none"
                                />
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>
                            <div>
                                <textarea
                                    rows="6"
                                    {...register("message", { required: 'Message is required' })}
                                    placeholder="Votre message..."
                                    className="w-full p-2 border border-gray-300 rounded outline-none"
                                />
                                {errors.message && <p className="text-red-600">{errors.message.message}</p>}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                <SubmitBtn>Envoyer</SubmitBtn>
                            </div>
                            <div className="text-center">
                                <span className="underline font-bold">NB:</span>{" "}
                                <span>Vos données sont strictement confidentielles et utilisées uniquement dans le cadre de votre demande.</span>
                                {successMessage && <p className="bg-green-500 rounded text-green-700">{successMessage}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rejoindre;

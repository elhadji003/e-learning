import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { formatRelativeDate } from '../outils/formatDate';

const Message = ({ message, onDelete }) => {
    const handleReply = () => {
        // Créer un sujet de l'email plus informatif
        const emailSubject = `Re: ${message.subject || 'Aucun Sujet'} - De ${message.fullName} - ${formatRelativeDate(message.sentAt)}`;

        // Corps de l'email
        const emailBody = `Bonjour ${message.fullName},\n\nMerci pour votre message. Comment puis-je vous aider ?\n\n`;

        // Redirection vers le client de messagerie
        window.location.href = `mailto:${message.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    };

    return (
        <li className="flex items-center justify-between bg-white p-4 shadow-md rounded sm:flex-col sm:ms-auto">
            <div>
                <p className="font-semibold my-1">{message.fullName}</p>
                <p className="text-sm text-gray-500 w-64">{message.message}</p>
            </div>
            <div className="flex flex-col sm:ms-auto">
                <div className='flex items-center space-x-4'>
                    <span className="text-sm text-gray-400">{formatRelativeDate(message.sentAt)}</span>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onDelete(message._id)}
                    >
                        <FaTrash />
                    </button>
                </div>
                <button
                    className="mt-2 text-blue-500 hover:text-blue-700 flex items-center gap-3"
                    onClick={handleReply}
                >
                    Répondre <IoArrowUndoOutline size={20} />
                </button>
            </div>
        </li>
    );
};

export default Message;

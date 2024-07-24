// src/components/Btn.js
import React from 'react';

const SubmitBtn = ({ onClick, children, className, disabled }) => {
    const baseClasses = "py-2 px-4 rounded font-semibold text-white focus:outline-none";
    const defaultClasses = "bg-indigo-600 hover:bg-indigo-700";
    const disabledClasses = "bg-gray-300 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${className} ${disabled ? disabledClasses : defaultClasses}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default SubmitBtn;

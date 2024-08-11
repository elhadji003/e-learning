// Temoignage.js
import React from "react";
import '../styles/animation.css';

const Temoignage = () => {

    const testimonials = [
        {
            name: "John Doe",
            text: "Cette plateforme est incroyable ! J'ai beaucoup appris.",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Jane Smith",
            text: "Les cours sont très bien structurés et faciles à suivre.",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Alice Johnson",
            text: "J'ai pu améliorer mes compétences grâce à cette plateforme.",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Alice Michael",
            text: "Franchement c'est top.",
            photo: "https://via.placeholder.com/150"
        }
    ];

    return (
        <div className="testimonial-container">
            <div className="testimonial-grid">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-96 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
                        <img src={testimonial.photo} alt={`${testimonial.name}'s photo`} className="w-16 h-16 rounded-full mb-4" />
                        <p className="text-gray-700 italic">"{testimonial.text}"</p>
                        <h3 className="text-indigo-600 mt-4 font-bold">{testimonial.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Temoignage;

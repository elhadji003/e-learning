import React from 'react';
import CountUp from 'react-countup';
import { Link } from "react-router-dom"

const CardUser = ({ programType }) => {

    const programs = {
        Troisieme: [
            { title: "FR", number: 123, content: "Français", logo: "FR", linkTo: "/cours/francais" },
            { title: "HG", number: 93, content: "Histoire et Géographie", logo: "HG", linkTo: "/cours/histoiregeo" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH", linkTo: "/cours/mathematiques" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC", linkTo: "/cours/physiquechimie" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG", linkTo: "/cours/anglais" },
            { title: "Espagnol", number: 39, content: "Langue espagnole", logo: "ESP", linkTo: "/cours/espagnol" }
        ],
        Second: [
            { title: "HG", number: 93, content: "Histoire et Géographie", logo: "HG", linkTo: "/cours/histoiregeo" },
            { title: "FR", number: 102, content: "Français", logo: "FR", linkTo: "/cours/francais" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH", linkTo: "/cours/mathematiques" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC", linkTo: "/cours/physiquechimie" },
            { title: "SVT", number: 72, content: "Science de Vie de la Terre", logo: "SVT", linkTo: "/cours/svt" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG", linkTo: "/cours/anglais" },
            { title: "Espagnol", number: 39, content: "Langue espagnol", logo: "ESP", linkTo: "/cours/espagnol" },
            { title: "Arabe", number: 39, content: "Langue Arabe", logo: "Arabe", linkTo: "/cours/arabe" },
        ],
        Premier: [
            { title: "HG", number: 93, content: "Philisophie", logo: "HG" },
            { title: "FR", number: 102, content: "Français", logo: "FR" },
            { title: "Philo", number: 102, content: "Philosophie", logo: "Philo" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC" },
            { title: "SVT", number: 72, content: "Science de Vie de la Terre", logo: "SVT" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG" },
            { title: "Espagnol", number: 39, content: "Langue espagnol", logo: "ESP" },
            { title: "Arabe", number: 39, content: "Langue Arabe", logo: "Arabe" },
        ],
        Terminal: [
            { title: "HG", number: 93, content: "Philisophie", logo: "HG" },
            { title: "FR", number: 102, content: "Français", logo: "FR" },
            { title: "Philo", number: 102, content: "Philosophie", logo: "Philo" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC" },
            { title: "SVT", number: 72, content: "Science de Vie de la Terre", logo: "SVT" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG" },
            { title: "Espagnol", number: 39, content: "Langue espagnol", logo: "ESP" },
            { title: "Arabe", number: 39, content: "Langue Arabe", logo: "Arabe" },
        ]
    };

    return (
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {programs[programType].map((program, index) => (
                <div key={index} className="w-[300px] sm:w-[255px] p-6 bg-white border border-indigo-200 rounded-lg shadow border-black">
                    <div className='flex items-center justify-between'>
                        <div className='w-12 h-12 font-extrabold border border-indigo-600 text-indigo-600 flex items-center justify-center rounded-full text-sm'>
                            {program.logo}
                        </div>
                        <div>
                            <h3 className='text-indigo-600'>Nombre de cours</h3>
                            <p className='font-extrabold text-end text-2xl text-indigo-600'>
                                <CountUp end={program.number} duration={3.5} />
                            </p>
                        </div>
                    </div>
                    <p className="mb-3 font-normal text-indigo-600">{program.content}</p>
                    {program.linkTo ? (
                        <Link to={program.linkTo} className='border border-indigo-600 text-indigo-600 rounded p-1'>Commencer</Link>
                    ) : (
                        <span className='border border-gray-400 text-gray-400 rounded p-1 cursor-not-allowed'>Pas de cours</span>
                    )}                </div>
            ))}
        </div>
    );
};

export default CardUser;

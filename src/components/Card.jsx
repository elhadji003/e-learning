import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ programType }) => {

    const handleConnect = () => {
        toast.warning(
            <div>
                Il vous faudra que vous connecter pour suivre les cours ! <Link className='underline' to="/login">Se connecter</Link>
            </div>
        );
    };

    const programs = {
        Troisieme: [
            { title: "FR", number: 123, content: "Français", logo: "FR" },
            { title: "HG", number: 93, content: "Histoire et Géographie", logo: "HG" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG" },
            { title: "Espagnol", number: 39, content: "Langue espagnol", logo: "ESP" }
        ],
        Second: [
            { title: "HG", number: 93, content: "Philisophie", logo: "HG" },
            { title: "FR", number: 102, content: "Français", logo: "FR" },
            { title: "Math", number: 56, content: "Mathématiques", logo: "MATH" },
            { title: "PC", number: 72, content: "Physique-Chimie", logo: "PC" },
            { title: "SVT", number: 72, content: "Science de Vie de la Terre", logo: "SVT" },
            { title: "Anglais", number: 48, content: "Langue anglaise", logo: "ANG" },
            { title: "Espagnol", number: 39, content: "Langue espagnol", logo: "ESP" },
            { title: "Arabe", number: 39, content: "Langue Arabe", logo: "Arabe" },
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
        <div className="grid grid-cols-3 gap-4">
            {programs[programType].map((program, index) => (
                <div key={index} className="w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow border-black">
                    <div className='flex items-center justify-between'>
                        <div className='w-12 h-12 font-extrabold border border-black bg-black text-white flex items-center justify-center rounded-full text-sm'>
                            {program.logo}
                        </div>
                        <div>
                            <h3 className='text-gray-500'>Nombre de cours</h3>
                            <p className='font-extrabold text-end text-2xl'>
                                <CountUp end={program.number} duration={3.5} />
                            </p>
                        </div>
                    </div>
                    <p className="mb-3 font-normal text-gray-500">{program.content}</p>
                    <button onClick={handleConnect} className='underline'>Plus de details...</button>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default Card;

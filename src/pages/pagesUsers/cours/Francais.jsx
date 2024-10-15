import React, { useEffect } from 'react';
import Titre from '../../../components/Titre';
import { toast } from 'react-toastify';
import { useGetCoursQuery } from '../../../features/cours/coursAPI';
import { useGetMeQuery } from '../../../features/auth/authAPI';

const Francais = () => {
    const { data: courses, error, isLoading } = useGetCoursQuery();
    const { data: user, error: userError } = useGetMeQuery(); // Récupérer l'utilisateur

    useEffect(() => {
        if (error) {
            toast.error('Erreur lors du chargement des cours');
        }
        if (userError) {
            toast.error('Erreur lors du chargement des informations utilisateur');
        }
    }, [error, userError]);

    const userLevel = user?.level;

    const allowedLevels = {
        'terminal': ['terminal'],
        'premiere': ['premiere'],
        'seconde': ['seconde'],
        'troisième': ['troisième']
    };

    const frenchCourses = courses?.filter(course =>
        allowedLevels[userLevel]?.includes(course.level.toLowerCase())
    );


    return (
        <>
            <Titre titre={"Français"} className={'text-center text-2xl border border-indigo-600 w-96 sm:w-full rounded m-auto shadow-md !text-indigo-600'} />
            <div className="max-w-5xl mx-auto mt-10 p-5">
                {isLoading ? (
                    <p className="text-center text-lg text-gray-500">Chargement des cours...</p>
                ) : frenchCourses && frenchCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {frenchCourses.map((course) => (
                            <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-indigo-600">{course.title}</h2>
                                    <p className="text-gray-700 mt-2">{course.description}</p>
                                    <p className="text-gray-500 mt-1">Niveau: {course.level}</p>
                                    <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-500">Aucun cours de français disponible pour le moment.</p>
                )}
            </div>
        </>
    );
};

export default Francais;

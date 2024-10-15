import React, { useState } from 'react';
import Titre from '../../components/Titre';
import Tabs from '../../components/Tabs';
import CardUser from '../../components/CardUser';
import ProgressionMe from '../../components/ProgressionMe';
// Importe les autres composants comme des modals si nécessaire
import { FaInfoCircle } from 'react-icons/fa'; // Icône d'info

const DashboardUser = () => {
    const [showNotification, setShowNotification] = useState(false);
    const badges = [
        { name: "Débutant", description: "A terminé 1 cours", icon: "🏅", color: "bg-indigo-600 text-white" },
        { name: "Intermédiaire", description: "A terminé 5 cours", icon: "🥈", color: "" },
        { name: "Expert", description: "A terminé 10 cours", icon: "🏆", color: "" }
    ];

    const tab = [
        {
            id: "Seconde",
            content: <CardUser programType="Second" button={true} />
        },
    ];

    return (
        <div className="p-4">
            {/* Section Cours */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Titre titre={"Mes cours"} className={'text-center text-2xl border border-indigo-600 w-96 sm:w-full rounded m-auto shadow-md !text-indigo-600'} />
                    <Tabs tabs={tab} />
                </div>

                {/* Section Progression */}
                <div className="col-span-1">
                    <div className="flex items-center justify-center">
                        <Titre titre={"Progressions"} className={'text-center text-2xl border border-indigo-600 w-96 sm:w-full rounded m-auto shadow-md !text-indigo-600'} />
                        <FaInfoCircle
                            className="ml-2 text-indigo-600 cursor-pointer"
                            size={24}
                            onClick={() => setShowNotification(!showNotification)}
                            title="Afficher plus d'infos"
                        />
                    </div>
                    <ProgressionMe />
                </div>
            </div>

            {/* Modal de notification qui apparaît au clic sur l'icône */}
            {showNotification && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h3 className="text-xl font-semibold text-center">Conseils et Progression</h3>
                        <div className="mt-4">
                            <p><strong>Cours terminés :</strong> </p>
                            <p><strong>Progression moyenne :</strong> 75%</p>
                        </div>

                        {/* Notification ou alerte */}
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4">
                            <strong className="font-bold">Rappel :</strong>
                            <span className="block sm:inline">N'oubliez pas de compléter vos cours pour cette semaine !</span>
                        </div>

                        {/* Conseils ou description */}
                        <div className="mt-4 bg-gray-100 p-4 rounded">
                            <h4 className="text-xl font-semibold mb-2">Conseil de la semaine :</h4>
                            <p>
                                Continuez à suivre votre rythme actuel et essayez de compléter au moins 3 chapitres cette semaine pour rester dans la bonne progression !
                            </p>
                        </div>

                        {/* Bouton pour fermer la modal */}
                        <button
                            onClick={() => setShowNotification(false)}
                            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            <div className='mt-5'>
                <h3 className="text-center text-xl font-semibold mb-4">Niveau</h3>
                <div className="flex justify-center space-x-4">
                    {badges.map((badge, index) => (
                        <div key={index} className={`p-4 rounded shadow text-center ${badge.color || 'bg-gray-200'}`}>
                            <span className="text-4xl">{badge.icon}</span>
                            <h4 className="font-semibold">{badge.name}</h4>
                            <p>{badge.description}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default DashboardUser;

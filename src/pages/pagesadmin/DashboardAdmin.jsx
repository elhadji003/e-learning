import React from 'react';
import { FaBook, FaEnvelope, FaUserCheck, FaUsers, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import { useGetAllUsersQuery } from '../../features/users/usersAPI';

const DashboardAdmin = () => {

    const { data: usersAdmin, isLoading } = useGetAllUsersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Filtrer pour récupérer uniquement les administrateurs
    const adminUsers = usersAdmin?.filter(user => user.role === 'admin') || [];

    const users = [
        { text: "Totale Etudiants", count: 11, icon: <FaUsers />, color: 'rgba(75, 192, 192, 0.6)' },
        { text: "Nouveau Etudiant", count: 41, icon: <FaUserCheck />, color: 'rgba(54, 162, 235, 0.6)' },
        { text: "Cours total", count: 51, icon: <FaBook />, color: 'rgba(255, 206, 86, 0.6)' },
        { text: "Messages", count: 31, icon: <FaEnvelope />, color: 'rgba(153, 102, 255, 0.6)' },
    ];

    const chartData = {
        labels: users.map(user => user.text),
        datasets: [
            {
                label: 'Count',
                data: users.map(user => user.count),
                backgroundColor: users.map(user => user.color),
                borderColor: users.map(user => user.color.replace('0.6', '1')),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const styleProfile = "w-9 h-9 rounded-full border-2 border-gray-300 shadow-md m-auto";

    const columns = [
        { header: "Profile", accessor: "profile" },
        { header: "Prénom", accessor: "firstName" },
        { header: "Adresse Email", accessor: "email" },
        { header: "Rôle", accessor: "role" },
        { header: "Téléphone", accessor: "phone" },
        { header: "Actions", accessor: "actions" },
    ];

    // Créer les données du tableau pour les administrateurs
    const adminData = adminUsers.map((user, index) => ({
        id: user.id,
        profile: <div>
            <img className={styleProfile} src={user.profileImageUrl} alt="" />
        </div>,
        firstName: user.username,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.number,
        actions: (
            <div className="flex justify-center space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                </button>
                <button className="text-green-500 hover:text-green-700">
                    <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                </button>
            </div>
        ),
    }));

    return (
        <div>
            <div className="flex sm:flex-col gap-3">
                {users.map((user, k) => (
                    <div className="flex-1 flex shadow-md" key={k}>
                        <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center m-4 rounded shadow-md">
                            {user.icon}
                        </div>
                        <div className='m-auto'>
                            <div>{user.text}</div>
                            <div className='border mb-3 text-center font-extrabold shadow'>{user.count}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-3 mt-4 sm:flex-col">
                <div className="flex-1 shadow-md">
                    <Chart data={chartData} options={chartOptions} />
                </div>
                <div className="flex-1 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-center">Notifications</h2>
                    <ul className="space-y-3 p-3">
                        <li className="flex items-center justify-between bg-white p-4 shadow-md rounded">
                            <div>
                                <p className="font-semibold">Admin 1</p>
                                <p className="text-sm text-gray-500">Inscrit au cours "Mathématiques Avancées"</p>
                            </div>
                            <span className="text-sm text-gray-400">Il y a 2 heures</span>
                        </li>
                        <li className="flex items-center justify-between bg-white p-4 shadow-md rounded">
                            <div>
                                <p className="font-semibold">Admin 2</p>
                                <p className="text-sm text-gray-500">A complété le cours "Physique 101"</p>
                            </div>
                            <span className="text-sm text-gray-400">Il y a 5 heures</span>
                        </li>
                        <li className="flex items-center justify-between bg-white p-4 shadow-md rounded">
                            <div>
                                <p className="font-semibold">Admin 3</p>
                                <p className="text-sm text-gray-500">A envoyé un message</p>
                            </div>
                            <span className="text-sm text-gray-400">Il y a 1 jour</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-4 shadow-md rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold mb-4 text-center">Liste des Administrateurs</h2>
                <Table data={adminData} columns={columns} bgColor="gray-200" />
            </div>
            <div className="shadow-md rounded">
                <h2 className="text-xl font-bold mb-4 text-center">Les etudiants les plus avancées</h2>
                <div className="flex">
                    <div className="flex-1 bg-gray-400">1</div>
                    <div className="flex-1 bg-gray-500">2</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;

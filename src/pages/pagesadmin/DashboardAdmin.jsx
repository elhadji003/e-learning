import React, { useState } from 'react';
import { FaBook, FaEnvelope, FaUserCheck, FaUsers, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { TbMessage2Off } from "react-icons/tb";
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import { useGetAllUsersQuery } from '../../features/users/usersAPI';
import IconWithDropdown from '../../components/IconWithDropdown';
import { useGetAllMessagesQuery, useDeleteMessageMutation } from '../../features/contact/contactAPI';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Message from '../../components/Message';

const DashboardAdmin = () => {
    const { data: usersAdmin, isLoading } = useGetAllUsersQuery();
    const { data: messages, refetch } = useGetAllMessagesQuery();
    const messageCount = messages?.length || 0
    const [deleteMessage] = useDeleteMessageMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    if (isLoading) {
        return <div><Loader /></div>;
    }

    const totalPages = messages ? Math.ceil(messages.length / itemsPerPage) : 1;
    const currentData = messages ? messages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const adminUsers = usersAdmin?.filter(user => user.role === 'admin') || [];

    const users = [
        { text: "Totale Etudiants", count: 11, icon: <FaUsers />, color: 'rgba(75, 192, 192, 0.6)' },
        { text: "Nouveau Etudiant", count: 41, icon: <FaUserCheck />, color: 'rgba(54, 162, 235, 0.6)' },
        { text: "Cours total", count: 51, icon: <FaBook />, color: 'rgba(255, 206, 86, 0.6)' },
        { text: "Messages", count: messageCount, icon: <FaEnvelope />, color: 'rgba(153, 102, 255, 0.6)' },
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

    const adminData = adminUsers.map(user => ({
        id: user.id,
        profile: (
            <div>
                <img className={styleProfile} src={user.profileImageUrl} alt="" />
            </div>
        ),
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

    const handleDeleteMessage = async (messageId) => {
        try {
            await deleteMessage(messageId).unwrap();
            toast.success("Message deleted successfully!");
            refetch(); // Refetch the messages to get the updated list
        } catch (error) {
            toast.error("Failed to delete the message.");
            console.error("Failed to delete the message:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-3 sm:flex-col">
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
            <div className="flex sm:flex-col gap-3 mt-4">
                <div className="flex-1 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 shadow-md">
                    <Chart data={chartData} options={chartOptions} />
                </div>
                <div className="flex-1 w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-center">Messages</h2>
                    <ul className="space-y-3 p-3">
                        {Array.isArray(currentData) && currentData.length > 0 ? (
                            currentData.map((message, k) => (
                                <Message
                                    key={k}
                                    message={message}
                                    onDelete={handleDeleteMessage}
                                />
                            ))
                        ) : (
                            <li className="p-4 flex flex-col items-center"><TbMessage2Off size={40} />Pas de message</li>
                        )}
                        <div className="flex gap-3 justify-end">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`border bg-white shadow-lg w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${currentPage === index + 1 ? "bg-indigo-600 text-black" : "bg-indigo-600"
                                        }`}
                                    onClick={() => changePage(index + 1)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
            <div className="mt-4 shadow-md rounded-lg p-4 mb-4 sm:hidden">
                <h2 className="text-xl font-bold mb-4 text-center">Liste des Administrateurs</h2>
                <Table data={adminData} columns={columns} bgColor="gray-200" />
            </div>
            <div className="shadow-md rounded">
                <h2 className="text-xl font-bold mb-4 text-center">Les étudiants les plus avancés</h2>
                <div className="flex sm:flex-col gap-2">
                    <div className="w-9/12 sm:w-full shadow-md p-4">
                        Met
                    </div>
                    <div className="w-3/12 sm:w-full shadow-md">
                        <h2 className='text-center text-white font-bold bg-indigo-600 mb-3'>Membres</h2>
                        <IconWithDropdown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;

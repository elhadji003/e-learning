import React from 'react';
import { FaChartBar, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetMeQuery, useLoginMutation } from '../features/auth/authAPI';

const Sidebar = ({ isOpen, onClose }) => {

    const { data: user } = useGetMeQuery()


    const KnowUser = () => {
        if (user.role === "admin") {
            return navigationAdmin;
        } else {
            return navigationUser;
        }
    }

    const navigationAdmin = [
        { name: 'Tableau de Bord', href: '/dashboard-admin', current: true, icon: <FaChartBar size={25} /> },
        { name: 'Utilisateurs', href: '/allUsers', current: true, icon: <FaUsers size={25} /> },
        { name: 'Projets', href: '#', current: false },
        { name: 'Cours', href: '/cours', current: true },
    ];

    const navigationUser = [
        { name: 'Tableau de Bord', href: '/dashboard-user', current: true, icon: <FaChartBar size={25} /> },
        { name: 'Projets', href: '#', current: false },
        { name: 'Cours', href: '/cours', current: true },
    ];

    const navigation = KnowUser();

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden="true"
            onClick={onClose}
        >
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ width: '250px' }}
            >
                <div className="p-4">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {
                    navigation.map((nav, k) => (
                        <div key={k}>
                            <Link
                                className='block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-3'
                                to={nav.href}
                                aria-current={nav.current ? 'page' : undefined}
                            >
                                {nav.icon} {nav.name}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;

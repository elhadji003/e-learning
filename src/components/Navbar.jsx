import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../features/auth/authAPI';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import Profile from "../assets/user.png";

const Navbar = ({ onToggleSidebar }) => {
    const { data: user, isLoading } = useGetMeQuery();
    const isStudent = user.role === "user"
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(Profile);

    useEffect(() => {
        if (user) {
            setProfileImageUrl(user.profileImageUrl || Profile);
        }
    }, [user]);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate("/");
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    console.log("user", user);

    return (
        <>
            <nav className="bg-indigo-600 p-4 flex justify-between items-center">
                <button
                    onClick={onToggleSidebar}
                    className="text-white focus:outline-none mr-4"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className="relative flex items-center gap-5">
                    <div>
                        <FaBell color='white' />
                    </div>
                    <div>
                        <button
                            onClick={handleDropdownToggle}
                            className="text-white focus:outline-none flex items-center"
                        >
                            <span>{user?.username}</span>
                            <span className="w-9 h-9 ms-3 rounded-full bg-white overflow-hidden">
                                <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                            </span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-[1]">
                                <h4 className='block text-center bg-indigo-600 rounded-t-md text-white uppercase border border-t-xl'>{user?.role}</h4>
                                <Link to={"/profil"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Paramétre</a>
                                <button onClick={handleLogOut} className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200 w-full">
                                    <span>Deconnexion</span>
                                    <span><FaSignOutAlt /></span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {isStudent && <div className="ms-auto border-l border-b border-indigo-600 w-fit p-2 text-indigo-600">
                <span>Niveau: <span className="font-bold uppercase">{user?.level}</span></span>
            </div>
            }
        </>
    );
};

export default Navbar;

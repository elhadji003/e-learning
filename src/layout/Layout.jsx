// src/components/Layout.js
import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut, setCredentials } from '../features/auth/authSlice';
import { useGetMeQuery } from '../features/auth/authAPI';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error, refetch } = useGetMeQuery();

    React.useEffect(() => {
        if (error) {
            dispatch(logOut());
            navigate('/');
        } else if (data) {
            dispatch(setCredentials({ user: data, token: localStorage.getItem('token') }));
        }
    }, [data, error, dispatch, navigate]);

    React.useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) return <div>Loading...</div>;

    const handleToggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex flex-col h-screen'>
            <Navbar onToggleSidebar={handleToggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className='flex-1 p-4'>
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    );
};

export default Layout;

import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');
    };

    return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;

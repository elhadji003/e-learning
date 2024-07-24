// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
    console.log('PrivateRoute - user:', user);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard-admin" />;
    }

    return <Outlet />;
};

export default PrivateRoute;

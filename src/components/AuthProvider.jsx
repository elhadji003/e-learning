// src/components/AuthProvider.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from '../features/auth/authAPI';
import { logout } from '../features/auth/authSlice';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const { error } = useGetMeQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (error) {
            dispatch(logout());
        }
    }, [error, dispatch]);

    return children;
};

export default AuthProvider;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from '../../features/auth/authAPI';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
    const token = useSelector((state) => state.auth.token);
    const { data, isLoading, error, refetch } = useGetMeQuery();

    const dispatch = useDispatch()
    const navigate = useNavigate()
i
    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }

    useEffect(() => {
        if (token) {
            // Rafraîchir les données après la connexion
            refetch();
        }
    }, [token, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;

    return (
        <div>
            <h1>{data.username}</h1>
            <p>Email: {data.email}</p>
            {/* Autres informations de l'utilisateur */}
            <button onClick={handleLogout}>Deconnexion</button>
        </div>
    );
};

export default DashboardUser;   

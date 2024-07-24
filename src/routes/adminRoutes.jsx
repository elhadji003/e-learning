// src/routes/adminRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import DashboardAdmin from '../pages/pagesadmin/DashboardAdmin';
import Profil from '../pages/pagesadmin/Profil';
import AllUSers from '../pages/pagesadmin/AllUSers';

const adminRoutes = [
    <Route key="dashboard-admin" path="/dashboard-admin" element={<DashboardAdmin />} />,
    <Route key="profil" path="/profil" element={<Profil />} />,
    <Route key="allUsers" path="/allUsers" element={<AllUSers />} />,
    // Ajoute d'autres routes admin ici
];

export default adminRoutes;

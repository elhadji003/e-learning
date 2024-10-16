// src/routes/adminRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import DashboardAdmin from '../pages/pagesadmin/DashboardAdmin';
import Profil from '../pages/pagesadmin/Profil';
import Troisieme from '../pages/pagesadmin/Troisieme';
import AddCours from '../pages/cours/AddCours';

const adminRoutes = [
    <Route key="dashboard-admin" path="/dashboard-admin" element={<DashboardAdmin />} />,
    <Route key="profil" path="/profil" element={<Profil />} />,
    <Route key="troisieme" path="/troisieme" element={<Troisieme />} />,
    <Route key="addCours" path="/addCours" element={<AddCours />} />,
    // Ajoute d'autres routes admin ici
];

export default adminRoutes;

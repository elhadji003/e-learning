// src/routes/userRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import DashboardUser from '../pages/pagesUsers/DashboardUser';
import ProfilUser from '../pages/pagesUsers/ProfilUser';

const userRoutes = [
  <Route key="dashboard-user" path="/dashboard-user" element={<DashboardUser />} />,
  <Route key="profil" path="/profil" element={<ProfilUser />} />
];

export default userRoutes;

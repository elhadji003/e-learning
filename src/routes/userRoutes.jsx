// src/routes/userRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import DashboardUser from '../pages/pagesUsers/DashboardUser';
import ProfilUser from '../pages/pagesUsers/ProfilUser';
import HistoireGeo from '../pages/pagesUsers/cours/HistoireGeo';
import Francais from '../pages/pagesUsers/cours/Francais';
import Mathematiques from '../pages/pagesUsers/cours/Mathematiques';
import PhysiqueChimie from '../pages/pagesUsers/cours/PhysiqueChimie';
import Anglais from '../pages/pagesUsers/cours/Anglais';
import Espagnol from '../pages/pagesUsers/cours/Espagnol';
import Svt from '../pages/pagesUsers/cours/Svt';
import Arabe from '../pages/pagesUsers/cours/Arabe';

const userRoutes = [
  <Route key="dashboard-user" path="/dashboard-user" element={<DashboardUser />} />,
  <Route key="profil" path="/profil" element={<ProfilUser />} />,
  <Route key="cours-francais" path="/cours/francais" element={<Francais />} />,
  <Route key="cours-histoiregeo" path="/cours/histoiregeo" element={<HistoireGeo />} />,
  <Route key="cours-mathematiques" path="/cours/mathematiques" element={<Mathematiques />} />,
  <Route key="cours-physiquechimie" path="/cours/physiquechimie" element={<PhysiqueChimie />} />,
  <Route key="cours-anglais" path="/cours/anglais" element={<Anglais />} />,
  <Route key="cours-espagnol" path="/cours/espagnol" element={<Espagnol />} />,
  <Route key="cours-svt" path="/cours/svt" element={<Svt />} />,
  <Route key="cours-arabe" path="/cours/arabe" element={<Arabe />} />,
];

export default userRoutes;

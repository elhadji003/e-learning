// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './layout/Layout';
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'
import Home from './pages/home/Home';
import Register from './pages/auth/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route allowedRoles={['admin']} key="admin">
            {adminRoutes}
          </Route>
          <Route allowedRoles={['user']} key="user">
            {userRoutes}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

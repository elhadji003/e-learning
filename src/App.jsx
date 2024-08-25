// src/App.js
import React from 'react';
import "animate.css"
import "./styles/Home.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './layout/Layout';
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'
import Home from './pages/home/Home';
import Register from './pages/auth/Register';
import ForgotPwd from './pages/auth/ForgotPwd';
import ResetPwd from './pages/auth/ResetPwd';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />
        <Route path="/reset-password/:id" element={<ResetPwd />} />
        <Route element={<Layout />}>
          <Route allowedRoles={['admin']} key="admin">
            {adminRoutes}
          </Route>
          <Route allowedRoles={['user']} key="user">
            {userRoutes}
          </Route>
        </Route>
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
  );
};

export default App;

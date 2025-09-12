import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetInTouch from './pages/getintouch';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<GetInTouch />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AppRoutes;

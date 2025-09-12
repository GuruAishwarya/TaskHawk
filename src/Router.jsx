import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetInTouch from './pages/getintouch';
import Signup from './components/Signup';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<GetInTouch />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AppRoutes;

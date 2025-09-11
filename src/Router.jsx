import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetInTouch from './pages/getintouch';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<GetInTouch />} />
    </Routes>
  );
}

export default AppRoutes;

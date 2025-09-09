import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetInTouch from './pages/getintouch';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GetInTouch />} />
      <Route path="/contact" element={<GetInTouch />} />
    </Routes>
  );
}

export default AppRoutes;

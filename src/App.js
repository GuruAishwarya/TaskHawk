import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetInTouch from './pages/getintouch';
import './App.css';
import AboutUs from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GetInTouch />} />
          <Route path="/contact" element={<GetInTouch />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

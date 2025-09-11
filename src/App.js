

import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GetInTouch />} />
          <Route path="/contact" element={<GetInTouch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



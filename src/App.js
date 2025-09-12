

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './Router';
import './App.css';

function Layout() {
  const location = useLocation();

  const hiddenPaths = ["/login", "/signup", "/forgot"];

  const shouldHideLayout = hiddenPaths.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideLayout && <Header />}
      <AppRoutes />
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;



import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page based on URL pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const currentPage = getCurrentPage();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo" onClick={() => handleNavigation('/')}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#4285F4"/>
              <path d="M8 6L16 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">
            <span className="task-text">Task</span>
            <span className="hawk-text">Hawk</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('/')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNavigation('/about')}
          >
            About Us
          </button>
          <button 
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <button className="login-button">Login</button>
         <a href="/signup"> <button className="signup-button">Sign Up</button></a>
        </div>
      </div>
    </header>
  );
};

export default Header;

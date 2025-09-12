import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
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
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/contact" className="nav-link active">Contact</a>
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

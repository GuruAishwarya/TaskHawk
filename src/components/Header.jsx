import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import Avatarimg from "./../Assets/avatar.png";
import Logo from "./../Assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstname, setFirstname] = useState("");

  // ✅ Check token & user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user"); // store user info during login
    setIsLoggedIn(!!token);

    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setFirstname(parsed.firstname || "");
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, [location]);

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    return "home";
  };

  const currentPage = getCurrentPage();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleCloseMenu();
    navigate("/login");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo" onClick={() => handleNavigation("/")}>
          <img
            src={Logo} // ✅ Place logo.png inside the public/ folder
            alt="TaskHawk Logo"
            className="logo-image"
          />
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <button
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            onClick={() => handleNavigation("/about")}
          >
            About Us
          </button>
          <button
            className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          {isLoggedIn ? (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {firstname}
              </Typography>
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                  {/* ✅ Common Avatar Image */}
                  <Avatar
                    alt="User"
                    src={Avatarimg}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleNavigation("/profile");
                    handleCloseMenu();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </button>
              <button
                className="signup-button"
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

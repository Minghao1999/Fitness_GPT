import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import '../styles/HomeNavbar.css';

const HomeNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const location = useLocation();

    const activeRoutes = {
        home: location.pathname === '/',
        exercises: location.pathname.includes('/exercises'),
        favorites: location.pathname === '/favorites',
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/" className="logo-link">
                    <div className="logo-content">
                        <img src={Logo} alt="app logo" className="logo-image" />
                        <p className="logo-text">Fitness GPT</p>
                    </div>
                </Link>
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={`nav-link ${activeRoutes.home ? 'active' : ''}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={`nav-link ${activeRoutes.exercises ? 'active' : ''}`}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={`nav-link ${activeRoutes.favorites ? 'active' : ''}`}
                    >
                        Login
                    </NavLink>
                </div>
                <button className="icon-button" onClick={handleMenuOpen}>
                    <span className="icon">☰</span>
                </button>
                {anchorEl && (
                    <div className="menu" style={{ top: anchorEl.getBoundingClientRect().bottom }}>
                        <div className="menu-item" onClick={handleMenuClose}>
                            <span className="avatar" /> Account
                        </div>
                        <div className="menu-item" onClick={handleMenuClose}>My Training Plan</div>
                        <div className="menu-item" onClick={handleMenuClose}>Settings</div>
                        <div className="menu-item" onClick={handleMenuClose}>Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeNavbar;

import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import '../styles/HomeNavbar.css';

const HomeNavbar: React.FC = () => {
    const location = useLocation();

    const activeRoutes = {
        home: location.pathname === '/',
        exercises: location.pathname.includes('/exercises'),
        favorites: location.pathname === '/favorites',
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
            </div>
        </div>
    );
};

export default HomeNavbar;

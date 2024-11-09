import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import '../styles/BoardNavbar.css';

const HomeNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleLogout = () => {
        // 删除令牌
        localStorage.removeItem('token'); // 假设令牌存储在 localStorage
        sessionStorage.removeItem('token'); // 如果用 sessionStorage 也可以一并移除

        // 重定向到初始页面
        navigate('/');

        // 关闭菜单
        handleMenuClose();
    };

    // 新增的函数：处理 Account 的跳转
    const handleAccountClick = () => {
        // 重定向到 /accountinfo 页面
        navigate('/accountinfo');
        
        // 关闭菜单
        handleMenuClose();
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <Link to="/dashboard" className="logo-link">
                    <div className="logo-content">
                        <img src={Logo} alt="app logo" className="logo-image" />
                        <p className="logo-text">Fitness GPT</p>
                    </div>
                </Link>
                <div className="nav-links">
                    <NavLink
                        to="/dashboard"
                        className={`nav-link ${activeRoutes.favorites ? 'active' : ''}`}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/user-message"
                        className={`nav-link ${activeRoutes.home ? 'active' : ''}`}
                    >
                        Chat
                    </NavLink>
                    <NavLink
                        to="/user-exercise"
                        className={`nav-link ${activeRoutes.exercises ? 'active' : ''}`}
                    >
                        Exercises
                    </NavLink>
                    <NavLink
                        to="/user-favorites"
                        className={`nav-link ${activeRoutes.favorites ? 'active' : ''}`}
                    >
                        Favorite
                    </NavLink>
                </div>
                <button className="icon-button" onClick={handleMenuOpen}>
                    <span className="icon">☰</span>
                </button>
                {anchorEl && (
                    <div className="menu" style={{ top: anchorEl.getBoundingClientRect().bottom }}>
                        <div className="menu-item" onClick={handleAccountClick}>
                            <span className="avatar" /> Account
                        </div>
                        <div className="menu-item" onClick={handleMenuClose}>My Training Plan</div>
                        <div className="menu-item" onClick={handleMenuClose}>Settings</div>
                        <div className="menu-item" onClick={handleLogout}>Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeNavbar;

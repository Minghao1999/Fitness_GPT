import React from 'react';
import './Styles/Login-bottom.css';
import { Link } from 'react-router-dom';

const AuthButtons: React.FC = () => {
    return (
        <div>
            <nav className="login-button-nav">
                <Link to="/login" className="auth-button-link">Login</Link>
            </nav>
            
        </div>
    );
};

export default AuthButtons;
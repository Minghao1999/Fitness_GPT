import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <Link to="/" className="footer-link">
                    <div className="footer-content">
                        <img src={Logo} alt="app logo" className="footer-logo" />
                        <p className="footer-title">Fitness GPT</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Footer;

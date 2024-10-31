import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/images/banner.png';
import './styles/Hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="title">Fitness Club</h1>
                    <h2 className="subtitle">
                        Sweat, Smile <br /> and Repeat
                    </h2>
                    <p className="description">Check out most effective exercises</p>
                </div>
                <div className="hero-button">
                    <Link to="/login" className="explore-button">
                        Explore Exercises
                    </Link>
                </div>
            </div>
            <img src={BannerImage} alt="Banner" className="hero-banner" />
        </div>
    );
};

export default Hero;

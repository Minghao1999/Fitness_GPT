import React from 'react';
import Hero from '../Components/Hero';
import './Styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Hero />
        </div>
    );
};

export default Home;

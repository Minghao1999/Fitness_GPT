import React from 'react';
import { Box, Container } from '@mui/material';
import './Styles/About.css';
import aboutData from '../Data/aboutData';
import aboutImage from '../assets/images/about-muscleman.png';

const AboutPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'black.main' }}>
      <Container>
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">{aboutData.title}</h1>
            {aboutData.texts.map((text, index) => (
              <p key={index} className="about-text">{text}</p>
            ))}
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Fitness Club Team" />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default AboutPage;
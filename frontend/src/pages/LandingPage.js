import React from 'react';
import '../components/FarmScene.css';
import backgroundNight from '../assets/noche_granja.jpg'; 

const LandingPage = () => {
  return (
    <div className="landing-full">
      <img 
        src={backgroundNight} 
        alt="Granja" 
        className="farm-background-img" 
      />
      
      <div className="sv-logo-container">
        <span className="sv-logo-prefix retro-title text-4xl">GRANJA</span>
        <h1 className="sv-logo-text">UNIVERSIDAD</h1>
        <p className="retro-title text-2xl text-white mt-8 animate-pulse drop-shadow-lg">Haz clic en el menú para comenzar</p>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import '../components/FarmScene.css';
import backgroundNight from '../assets/noche_granja.jpg'; 
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="landing-full">
      <img 
        src={backgroundNight} 
        alt="Granja" 
        className="farm-background-img" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="sv-logo-container"
      >
        <span className="retro-title text-4xl tracking-widest text-[#f4b41b] drop-shadow-lg">REGRESO A LA</span>
        <h1 className="sv-logo-text retro-title">FINCA LA PRIMAVERA</h1>
        <p className="retro-title text-2xl text-[#f7e6c4] mt-8 animate-pulse drop-shadow-lg">Haz clic en el menú para administrar</p>
      </motion.div>

      {/* Retro Stars or effect if needed */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
    </div>
  );
};

export default LandingPage;

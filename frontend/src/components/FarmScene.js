import React from 'react';
import './FarmScene.css';
// Importamos la imagen desde la carpeta assets
import backgroundNight from '../assets/noche_granja.jpg';

const FarmScene = ({ farmName = "UNIVERSIDAD" }) => {
  return (
    <div className="farm-main-area">
      {/* Imagen de fondo */}
      <img 
        src={backgroundNight} 
        alt="Stardew Valley Night" 
        className="farm-background-img" 
      />

      {/* Título superpuesto al estilo Stardew Valley */}
      <div className="sv-logo-container">
        <span className="sv-logo-prefix">GRANJA</span>
        <h1 className="sv-logo-text">{farmName}</h1>
      </div>

      {/* Aquí es donde caerá el contenido de tus páginas (Ventas, Inventario, etc.) */}
      <div className="farm-content-overlay">
        {/* Este espacio queda libre para tus formularios futuros */}
      </div>
    </div>
  );
};

export default FarmScene;
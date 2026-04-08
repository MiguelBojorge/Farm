import React from 'react';
import './FarmScene.css';

const FarmScene = ({ children }) => {
  return (
    <div className="farm-management-bg">
      {/* Fondo limpio de tablero, estilo madera clara / crema */}
      <div className="farm-board-container">
        <div className="farm-content-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FarmScene;
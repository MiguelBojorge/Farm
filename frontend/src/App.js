// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import FarmScene from './components/FarmScene';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* El Sidebar se queda fijo a la izquierda */}
      <Sidebar />

      {/* El FarmScene ocupa el resto de la pantalla a la derecha */}
      <FarmScene farmName="UNIVERSIDAD" />
    </div>
  );
}

export default App;
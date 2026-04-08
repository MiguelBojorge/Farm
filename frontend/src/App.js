import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FarmScene from './components/FarmScene';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Cerdos from './pages/Cerdos';
import Cultivos from './pages/Cultivos';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';
import Finanzas from './pages/Finanzas';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<FarmScene><Dashboard /></FarmScene>} />
            <Route path="/cerdos" element={<FarmScene><Cerdos /></FarmScene>} />
            <Route path="/cultivos" element={<FarmScene><Cultivos /></FarmScene>} />
            <Route path="/inventario" element={<FarmScene><Inventario /></FarmScene>} />
            <Route path="/ventas" element={<FarmScene><Ventas /></FarmScene>} />
            <Route path="/finanzas" element={<FarmScene><Finanzas /></FarmScene>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
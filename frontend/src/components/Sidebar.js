import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'cerdos', label: 'Gestión de Cerdos', icon: '🐷', path: '/cerdos' },
    { id: 'cultivos', label: 'Control Cultivos', icon: '🌽', path: '/cultivos' },
    { id: 'inventario', label: 'Insumos / Stock', icon: '📦', path: '/inventario' },
    { id: 'ventas', label: 'Ventas / Clientes', icon: '💰', path: '/ventas' },
    { id: 'finanzas', label: 'Reportes Finanzas', icon: '📊', path: '/finanzas' },
  ];

  return (
    <div className="sidebar-dark-wood">
      <div className="sidebar-header">
        <NavLink to="/" className="no-underline">
           <span className="text-4xl">🏠</span>
           <h2>Panel de Granja</h2>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>Versión 1.0 - Universidad</p>
      </div>
    </div>
  );
};

export default Sidebar;
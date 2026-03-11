import React from 'react';
import './Sidebar.css'; // Asegúrate de crear este archivo

const Sidebar = () => {
  const menuItems = [
    { id: 'ventas', label: 'Gestión de Ventas', icon: '💰' },
    { id: 'precios', label: 'Precios de Mercado', icon: '📈' },
    { id: 'inventario', label: 'Inventario Animal', icon: '🐄' },
    { id: 'gastos', label: 'Gastos Producción', icon: '🚜' },
    { id: 'reportes', label: 'Reportes Financieros', icon: '📊' },
    { id: 'usuarios', label: 'Usuarios y Roles', icon: '👤' },
  ];

  return (
    <div className="stardew-sidebar">
      <div className="sidebar-header">
        <h2>Panel de Granja</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-item">
              <button className="sidebar-link">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
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
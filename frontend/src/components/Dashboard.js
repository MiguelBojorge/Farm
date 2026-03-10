import React from "react";

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-yellow-50 rounded-lg shadow-xl p-6 hover:scale-105 transition transform">
        <h3 className="text-xl font-bold text-green-700">🐄 Animales</h3>
        <p className="text-yellow-800">12 registrados</p>
      </div>
      <div className="bg-yellow-50 rounded-lg shadow-xl p-6 hover:scale-105 transition transform">
        <h3 className="text-xl font-bold text-green-700">💰 Finanzas</h3>
        <p className="text-yellow-800">Ingresos hoy: $500</p>
      </div>
      <div className="bg-yellow-50 rounded-lg shadow-xl p-6 hover:scale-105 transition transform">
        <h3 className="text-xl font-bold text-green-700">🛒 Ventas</h3>
        <p className="text-yellow-800">3 ventas realizadas</p>
      </div>
    </div>
  );
}

export default Dashboard;
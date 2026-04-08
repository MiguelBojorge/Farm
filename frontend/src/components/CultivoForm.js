import React, { useState } from "react";
import api from "../services/api";

function CultivoForm({ onAdded }) {
  const [formData, setFormData] = useState({
    tipo: "PAPAYA",
    area_manzanas: 1.0,
    fecha_siembra: new Date().toISOString().split('T')[0],
    estado: "CRECIMIENTO",
    cantidad_estimada: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("cultivos/", formData).then(() => {
      onAdded();
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-white mb-6">
      <h3 className="text-xl font-bold mb-4">Registrar Nuevo Cultivo</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm opacity-70 mb-1">Tipo de Cultivo</label>
          <select
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none text-black"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          >
            <option value="PAPAYA">Papaya</option>
            <option value="PLATANO">Plátano</option>
          </select>
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Área (Manzanas)</label>
          <input
            type="number"
            step="0.1"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.area_manzanas}
            onChange={(e) => setFormData({ ...formData, area_manzanas: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Fecha Siembra</label>
          <input
            type="date"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none text-black"
            value={formData.fecha_siembra}
            onChange={(e) => setFormData({ ...formData, fecha_siembra: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Cant. Estimada (Unid)</label>
          <input
            type="number"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.cantidad_estimada}
            onChange={(e) => setFormData({ ...formData, cantidad_estimada: e.target.value })}
            required
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg transition-colors">
            Registrar Cultivo
          </button>
        </div>
      </form>
    </div>
  );
}

export default CultivoForm;

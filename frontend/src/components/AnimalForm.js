import React, { useState } from "react";
import api from "../services/api";

function AnimalForm({ onAdded }) {
  const [formData, setFormData] = useState({
    id_batch: "",
    raza: "",
    cantidad_inicial: 10,
    peso_promedio_inicial: 5.0,
    fecha_entrada: new Date().toISOString().split('T')[0],
    estado: "ENGORDE"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        ...formData,
        cantidad_actual: formData.cantidad_inicial
    };
    api.post("lotes-cerdos/", data).then(() => {
      onAdded();
      setFormData({
        id_batch: "",
        raza: "",
        cantidad_inicial: 10,
        peso_promedio_inicial: 5.0,
        fecha_entrada: new Date().toISOString().split('T')[0],
        estado: "ENGORDE"
      });
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-white mb-6">
      <h3 className="text-xl font-bold mb-4">Registrar Nuevo Lote</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm opacity-70 mb-1">ID de Lote</label>
          <input
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.id_batch}
            onChange={(e) => setFormData({ ...formData, id_batch: e.target.value })}
            required
            placeholder="Ej: LOTE-001"
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Raza</label>
          <input
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.raza}
            onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
            required
            placeholder="Ej: Landrace"
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Cantidad Inicial</label>
          <input
            type="number"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.cantidad_inicial}
            onChange={(e) => setFormData({ ...formData, cantidad_inicial: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Peso Promedio (kg)</label>
          <input
            type="number"
            step="0.1"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.peso_promedio_inicial}
            onChange={(e) => setFormData({ ...formData, peso_promedio_inicial: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Fecha Entrada</label>
          <input
            type="date"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none text-black"
            value={formData.fecha_entrada}
            onChange={(e) => setFormData({ ...formData, fecha_entrada: e.target.value })}
            required
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded shadow-lg transition-colors">
            Registrar Lote
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalForm;
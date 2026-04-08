import React, { useState } from "react";
import api from "../services/api";

function ProductoForm({ onAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "ALIMENTO",
    cantidad: 0,
    precio_unitario: 0,
    stock_minimo: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("productos/", formData).then(() => {
      onAdded();
      setFormData({
        nombre: "",
        categoria: "ALIMENTO",
        cantidad: 0,
        precio_unitario: 0,
        stock_minimo: 5
      });
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-white mb-6">
      <h3 className="text-xl font-bold mb-4">Agregar Insumo / Producto</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm opacity-70 mb-1">Nombre del Producto</label>
          <input
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            placeholder="Ej: Fertilizante NPK"
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Categoría</label>
          <select
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none text-black"
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
          >
            <option value="ALIMENTO">Alimento</option>
            <option value="MEDICINA">Medicina</option>
            <option value="HERRAMIENTA">Herramienta</option>
            <option value="OTROS">Otros</option>
          </select>
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Cantidad Inicial</label>
          <input
            type="number"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.cantidad}
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Precio Unitario ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.precio_unitario}
            onChange={(e) => setFormData({ ...formData, precio_unitario: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm opacity-70 mb-1">Stock Mínimo (Alerta)</label>
          <input
            type="number"
            className="w-full bg-white/20 border border-white/30 rounded p-2 focus:bg-white/30 outline-none"
            value={formData.stock_minimo}
            onChange={(e) => setFormData({ ...formData, stock_minimo: e.target.value })}
            required
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded shadow-lg transition-colors">
            Guardar en Inventario
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductoForm;
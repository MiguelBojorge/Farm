import React, { useState } from "react";
import api from "../services/api";

function ProductoForm({ onAdded }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("productos/", { nombre, cantidad })
      .then(() => {
        setNombre("");
        setCantidad("");
        onAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del producto" />
      <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} placeholder="Cantidad" />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductoForm;
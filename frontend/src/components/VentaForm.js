import React, { useState } from "react";
import api from "../services/api";

function VentaForm({ onAdded }) {
  const [animalId, setAnimalId] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("ventas/", { animal: animalId, precio })
      .then(() => {
        setAnimalId("");
        setPrecio("");
        onAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input value={animalId} onChange={e => setAnimalId(e.target.value)} placeholder="ID del animal" />
      <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio" />
      <button type="submit">Registrar Venta</button>
    </form>
  );
}

export default VentaForm;
import React, { useState } from "react";
import api from "../services/api";

function TransaccionForm({ onAdded }) {
  const [tipo, setTipo] = useState("INGRESO");
  const [monto, setMonto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("transacciones/", { tipo, monto })
      .then(() => {
        setMonto("");
        onAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="INGRESO">Ingreso</option>
        <option value="EGRESO">Egreso</option>
      </select>
      <input type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto" />
      <button type="submit">Registrar Transacción</button>
    </form>
  );
}

export default TransaccionForm;
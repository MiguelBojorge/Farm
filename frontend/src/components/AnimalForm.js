import React, { useState } from "react";
import api from "../services/api";

function AnimalForm({ onAdded }) {
  const [tipo, setTipo] = useState("");
  const [peso, setPeso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("animales/", { tipo, peso })
      .then(() => {
        setTipo("");
        setPeso("");
        onAdded(); // refresca la lista
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tipo de animal"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AnimalForm;
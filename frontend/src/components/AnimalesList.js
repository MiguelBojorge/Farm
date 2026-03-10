import React, { useEffect, useState } from "react";
import api from "../services/api";

function AnimalesList({ refresh }) {
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    api.get("animales/").then(res => setAnimales(res.data));
  }, [refresh]); // 👈 se recarga cuando cambia "refresh"

  return (
    <div>
      <h2>Lista de Animales</h2>
      {animales.length === 0 ? (
        <p>No hay animales registrados.</p>
      ) : (
        <ul>
          {animales.map(a => (
            <li key={a.id}>{a.tipo} - {a.peso} kg</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnimalesList;
import React, { useEffect, useState } from "react";
import { getLotes } from "../services/api";

function AnimalesList({ refresh }) {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    getLotes().then(res => setLotes(res.data));
  }, [refresh]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white">
      <h2 className="text-xl font-bold mb-4">Lotes de Cerdos</h2>
      {lotes.length === 0 ? (
        <p className="opacity-70">No hay lotes registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">ID Lote</th>
                <th className="p-2">Raza</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map(lote => (
                <tr key={lote.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-2">{lote.id_batch}</td>
                  <td className="p-2">{lote.raza}</td>
                  <td className="p-2">{lote.cantidad_actual} / {lote.cantidad_inicial}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 bg-blue-500/50 rounded text-xs">{lote.estado}</span>
                  </td>
                  <td className="p-2 text-sm">{lote.fecha_entrada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnimalesList;
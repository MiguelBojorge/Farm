import React, { useEffect, useState } from "react";
import { getCultivos } from "../services/api";

function CultivosList({ refresh }) {
  const [cultivos, setCultivos] = useState([]);

  useEffect(() => {
    getCultivos().then(res => setCultivos(res.data));
  }, [refresh]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white">
      <h2 className="text-xl font-bold mb-4">Cultivos en Manzanas</h2>
      {cultivos.length === 0 ? (
        <p className="opacity-70">No hay cultivos registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Tipo</th>
                <th className="p-2">Área (Mnz)</th>
                <th className="p-2">Fecha Siembra</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cultivos.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-2 font-bold">{c.tipo}</td>
                  <td className="p-2">{c.area_manzanas}</td>
                  <td className="p-2">{c.fecha_siembra}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${c.estado === 'COSECHA' ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CultivosList;

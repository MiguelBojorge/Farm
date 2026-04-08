import React, { useState, useEffect } from 'react';
import api, { getProductos } from '../services/api';
import ProductoForm from '../components/ProductoForm';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getProductos().then(res => setProductos(res.data));
  }, [refresh]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Inventario de Insumos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <ProductoForm onAdded={() => setRefresh(prev => prev + 1)} />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white">
            <h3 className="text-xl font-bold mb-4">Stock Actual</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-2">Producto</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">Cantidad</th>
                    <th className="p-2">Urgencia</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2 font-medium">{p.nombre}</td>
                      <td className="p-2 text-sm opacity-80">{p.categoria}</td>
                      <td className="p-2">{p.cantidad}</td>
                      <td className="p-2">
                        {p.cantidad <= p.stock_minimo ? (
                          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">BAJO STOCK</span>
                        ) : (
                          <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
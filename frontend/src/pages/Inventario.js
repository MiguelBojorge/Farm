import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/api';
import ProductoForm from '../components/ProductoForm';
import { Package, AlertTriangle, CheckCircle2, ShoppingBag, BarChart2 } from 'lucide-react';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getProductos().then(res => setProductos(res.data));
  }, [refresh]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-2">
         <h1 className="text-4xl font-extrabold text-[#4a321f]">Inventario de Insumos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ProductoForm onAdded={() => setRefresh(prev => prev + 1)} />
        </div>
        
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-[#e2e2d5] overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#e2e2d5] flex justify-between items-center bg-[#fdfcf5]">
              <h3 className="text-xl font-bold text-[#4a321f]">Stock Actual</h3>
              <Package className="text-slate-300" />
            </div>
            
            <table className="rustic-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Urgencia</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td className="font-bold text-slate-700">{p.nombre}</td>
                    <td className="text-slate-500 font-medium uppercase text-xs tracking-widest">{p.categoria}</td>
                    <td className="font-bold text-lg">{p.cantidad}</td>
                    <td>
                      {p.cantidad <= p.stock_minimo ? (
                        <span className="badge badge-danger animate-pulse">REABASTECER</span>
                      ) : (
                        <span className="badge badge-success">OK</span>
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
  );
};

export default Inventario;
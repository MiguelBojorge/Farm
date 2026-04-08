import React, { useState, useEffect } from 'react';
import { getProductos, getLotes, getCultivos, getVentas, createVenta } from '../services/api';
import { ShoppingCart, Package, Beef, Sprout, FileText, Trash2, Plus, Download, User, DollarSign, Scale, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [cultivos, setCultivos] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [clienteNombre, setClienteNombre] = useState("CONSUMIDOR FINAL");
  const [configItem, setConfigItem] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [v, p, l, c] = await Promise.all([
        getVentas(), getProductos(), getLotes(), getCultivos()
      ]);
      setVentas(v.data);
      setProductos(p.data);
      setLotes(l.data);
      setCultivos(c.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openConfigModal = (item) => {
    let suggestedPrice = 45;
    const raza = (item.raza || "").toUpperCase();
    if (raza.includes("LANDRACE")) suggestedPrice = 52;
    else if (raza.includes("DUROC")) suggestedPrice = 50;
    else if (raza.includes("YORKSHIRE")) suggestedPrice = 48;

    setConfigItem({
        ...item,
        qty: 1,
        avg_weight: item.peso_actual || item.peso_promedio_inicial || 50,
        price_per_kg: suggestedPrice
    });
  };

  const addItemToCart = (item, type) => {
    if (type === 'lote') {
        openConfigModal(item);
        return;
    }
    const exists = cart.find(c => c.id === item.id && c.type === type);
    if (exists) {
      setCart(cart.map(c => (c.id === item.id && c.type === type) ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { 
        id: item.id, 
        name: item.nombre || item.tipo, 
        type, 
        qty: 1, 
        price: item.precio_unitario || 50 
      }]);
    }
  };

  const confirmPigSale = () => {
    const totalPrice = configItem.qty * configItem.avg_weight * configItem.price_per_kg;
    setCart([...cart, {
        id: configItem.id,
        name: configItem.id_batch,
        type: 'lote',
        qty: configItem.qty,
        weight: configItem.avg_weight,
        price_kg: configItem.price_per_kg,
        price: totalPrice / configItem.qty,
        isPigDetail: true
    }]);
    setConfigItem(null);
  };

  const removeFromCart = (idx) => {
    const newCart = [...cart];
    newCart.splice(idx, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + (item.qty * item.price), 0);

  const finalizeSale = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      // Payload para el serializador anidado del backend
      const detalles = cart.map(item => ({
        cantidad: item.type === 'lote' ? item.qty : item.qty,
        precio_unitario: item.price,
        subtotal: item.qty * item.price,
        lote_cerdos: item.type === 'lote' ? item.id : null,
        producto: item.type === 'prod' ? item.id : null,
        cultivo: item.type === 'cult' ? item.id : null
      }));

      const payload = {
        cliente: 1, // Por simplicidad usamos el ID 1 de CLIENTE (debe existir)
        total: total,
        metodo_pago: 'EFECTIVO',
        pagado: true,
        detalles: detalles
      };

      await createVenta(payload);
      alert("Factura cargada. El stock se ha actualizado automáticamente.");
      setCart([]);
      fetchData();
    } catch (err) {
        console.error(err);
      alert("Error al procesar venta. Asegúrate de tener al menos un Cliente ID: 1 en el sistema.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-center border-b-8 border-[#5d3a1a] pb-8">
        <div>
          <h1 className="retro-title text-7xl text-[#5d3a1a]">CAJA Y FACTURACIÓN</h1>
          <p className="text-[#a0744a] font-black uppercase text-sm tracking-widest flex items-center gap-2">
            <DollarSign size={18}/> Punto de Venta - Nicaragua
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border-4 border-[#5d3a1a] shadow-lg">
            <User className="text-[#5d3a1a]" />
            <input 
                type="text" 
                className="bg-transparent font-black text-[#5d3a1a] outline-none border-b-2 border-gray-200 focus:border-[#00d2ff] uppercase text-sm"
                value={clienteNombre}
                readOnly
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <CatalogSection title="INSUMOS" items={productos} icon={<Package />} color="border-blue-200" onAdd={(i) => addItemToCart(i, 'prod')} />
          <CatalogSection title="LOTES DE CERDOS" items={lotes} icon={<Beef />} color="border-pink-200" onAdd={(i) => addItemToCart(i, 'lote')} isBatch />
          <CatalogSection title="CULTIVOS" items={cultivos.filter(c => c.estado === 'COSECHA')} icon={<Sprout />} color="border-green-200" onAdd={(i) => addItemToCart(i, 'cult')} />
        </div>

        <div className="lg:col-span-1">
          <div className="farm-board-container !m-0 !p-8 sticky top-10 h-fit bg-[#fdf6e3]">
            <h3 className="retro-title text-3xl mb-6 flex items-center gap-3"><ShoppingCart /> RECIBO</h3>
            <div className="space-y-4 min-h-[300px]">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-[#5d3a1a]/10">
                  <div className="flex justify-between items-start">
                    <div>
                        <p className="font-black text-[#5d3a1a] text-sm uppercase">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{item.qty} x C${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(idx)} className="text-red-400"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-4 border-dashed border-[#5d3a1a]/20 pt-6 mt-8 text-right">
              <span className="retro-title text-2xl">TOTAL C$</span>
              <p className="readable-number text-4xl font-black text-[#5d3a1a]">{total.toLocaleString()}</p>
              <button disabled={cart.length === 0 || loading} onClick={finalizeSale} className="w-full mt-8 bg-[#5d3a1a] text-[#f4b41b] py-6 rounded-3xl text-2xl font-black shadow-lg hover:brightness-110 active:translate-y-1">
                {loading ? '...' : 'FACTURAR'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {configItem && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="modal-content max-w-xl">
              <h2 className="retro-title text-3xl text-[#5d3a1a] mb-6">Configurar Venta Cerdo</h2>
              <div className="grid grid-cols-2 gap-4 text-left">
                   <ConfigInput label="Cant" icon={<Plus/>} value={configItem.qty} onChange={e => setConfigItem({...configItem, qty: parseInt(e.target.value) || 0})} type="number" />
                   <ConfigInput label="Peso kg" icon={<Scale/>} value={configItem.avg_weight} onChange={e => setConfigItem({...configItem, avg_weight: parseFloat(e.target.value) || 0})} type="number" />
                   <ConfigInput label="Precio C$/kg" icon={<DollarSign/>} value={configItem.price_per_kg} onChange={e => setConfigItem({...configItem, price_per_kg: parseFloat(e.target.value) || 0})} type="number" />
              </div>
              <button onClick={confirmPigSale} className="w-full bg-[#5d3a1a] text-[#f4b41b] py-4 rounded-2xl font-black mt-6">AÑADIR</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CatalogSection = ({ title, items, icon, onAdd, color }) => (
  <div className={`glass-card !p-8 border-l-8 ${color}`}>
    <div className="flex items-center gap-3 mb-6">
        <div className="text-[#5d3a1a]">{icon}</div>
        <h3 className="retro-title text-3xl text-[#5d3a1a]">{title}</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <button key={item.id} onClick={() => onAdd(item)} className="bg-white border-2 border-gray-100 p-4 rounded-3xl text-left hover:border-blue-300">
          <p className="font-black text-[#5d3a1a] text-xs uppercase">{item.nombre || item.id_batch || item.tipo}</p>
          <div className="flex justify-between items-center text-[9px] font-black text-gray-400 mt-2">
            <span>STOCK: {item.cantidad_actual || item.cantidad || 0}</span>
            <Plus size={14} />
          </div>
        </button>
      ))}
    </div>
  </div>
);

const ConfigInput = ({ label, icon, ...props }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-black text-gray-400 uppercase">{label}</label>
        <div className="relative flex items-center">
            <div className="absolute left-2 text-[#a0744a]">{icon}</div>
            <input {...props} className="w-full bg-white border-2 border-gray-200 p-2 pl-8 rounded-xl font-black text-[#5d3a1a] outline-none" />
        </div>
    </div>
);

export default Ventas;
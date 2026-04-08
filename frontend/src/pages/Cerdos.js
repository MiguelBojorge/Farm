import React, { useState, useEffect } from 'react';
import { getLotes, createLote, updateLote, getProductos, createConsumo } from '../services/api';
import { Plus, Scale, TrendingUp, Calendar, Hash, X, Save, Edit3, Beef, Users, DollarSign, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cerdos = () => {
  const [lotes, setLotes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWeight, setEditingWeight] = useState(null); 
  const [recordingFeed, setRecordingFeed] = useState(null); // {loteId, alimentoId, qty}
  
  const [formData, setFormData] = useState({
    id_batch: 'LOTE-',
    raza: '',
    cantidad_inicial: '',
    peso_promedio_inicial: '',
    costo_inicial: '',
    fecha_entrada: new Date().toISOString().split('T')[0],
    estado: 'ENGORDE'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resLotes, resProds] = await Promise.all([getLotes(), getProductos()]);
      setLotes(resLotes.data);
      setProductos(resProds.data.filter(p => p.categoria === 'ALIMENTO'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        cantidad_actual: formData.cantidad_inicial,
        peso_actual: formData.peso_promedio_inicial
      };
      await createLote(dataToSend);
      setShowForm(false);
      setFormData({ ...formData, id_batch: 'LOTE-', raza: '', cantidad_inicial: '', peso_promedio_inicial: '', costo_inicial: '' });
      fetchData();
    } catch (e) {
      alert("ID duplicado o datos inválidos.");
    }
  };

  const saveNewWeight = async () => {
    if (!editingWeight.newWeight || isNaN(editingWeight.newWeight)) return;
    try {
      await updateLote(editingWeight.id, { peso_actual: parseFloat(editingWeight.newWeight) });
      setEditingWeight(null);
      fetchData();
    } catch (e) {
      alert("Error al actualizar peso.");
    }
  };

  const saveFeedConsumption = async () => {
    if (!recordingFeed.qty || !recordingFeed.alimentoId) return;
    try {
      const alimento = productos.find(p => p.id.toString() === recordingFeed.alimentoId.toString());
      const totalCost = parseFloat(recordingFeed.qty) * parseFloat(alimento.precio_unitario);
      
      await createConsumo({
        lote: recordingFeed.loteId,
        alimento: recordingFeed.alimentoId,
        cantidad: parseFloat(recordingFeed.qty),
        monto_total: totalCost
      });
      setRecordingFeed(null);
      alert("Consumo registrado. Se ha descontado del inventario.");
      fetchData();
    } catch (e) {
      alert("Error al registrar consumo. Verifica el stock del alimento.");
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b-8 border-[#5d3a1a] pb-8">
        <div className="text-center md:text-left">
          <h1 className="retro-title text-7xl text-[#5d3a1a]">CONTROL PORCINO</h1>
          <p className="font-black text-[#a0744a] flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest text-[10px]">
            <Beef size={14} /> Gestión de Biomasa y Rentabilidad Nicaragua
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-[#f4b41b] border-4 border-[#5d3a1a] px-8 py-4 rounded-3xl flex items-center gap-4 font-black text-xl shadow-[8px_8px_0px_#5d3a1a]"
        >
          {showForm ? <X /> : <Plus />} {showForm ? 'CERRAR' : 'NUEVO INGRESO'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="farm-board-container relative">
            <h3 className="retro-title text-4xl mb-10 text-center">Inscripción de Lote de Engorde</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <InteractiveInput icon={<Hash />} label="ID LOTE" value={formData.id_batch} onChange={e => setFormData({...formData, id_batch: e.target.value})} />
              <InteractiveInput icon={<Beef />} label="Raza" value={formData.raza} onChange={e => setFormData({...formData, raza: e.target.value})} />
              <InteractiveInput icon={<Users />} label="Cant Animales" type="number" value={formData.cantidad_inicial} onChange={e => setFormData({...formData, cantidad_inicial: e.target.value})} />
              <InteractiveInput icon={<Scale />} label="Peso Ini (kg)" type="number" value={formData.peso_promedio_inicial} onChange={e => setFormData({...formData, peso_promedio_inicial: e.target.value})} />
              <InteractiveInput icon={<DollarSign />} label="Costo Inicial (C$)" type="number" value={formData.costo_inicial} onChange={e => setFormData({...formData, costo_inicial: e.target.value})} placeholder="Inversión total" />
              <InteractiveInput icon={<Calendar />} label="Fecha Entrada" type="date" value={formData.fecha_entrada} onChange={e => setFormData({...formData, fecha_entrada: e.target.value})} />
              
              <div className="md:col-span-3">
                <button type="submit" className="w-full bg-[#5d3a1a] text-[#f4b41b] py-6 rounded-3xl text-3xl font-black shadow-[0px_10px_0px_#2d1a0a] hover:translate-y-1 transition-all">
                  REGISTRAR INVERSIÓN
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {lotes.map(lote => (
          <EnhancedLoteCard 
            key={lote.id} lote={lote} 
            onEdit={() => setEditingWeight({ id: lote.id, currentWeight: lote.peso_actual || lote.peso_promedio_inicial, newWeight: '' })} 
            onFeed={() => setRecordingFeed({ loteId: lote.id, qty: '', alimentoId: productos[0]?.id || '' })}
          />
        ))}
      </div>

      {/* MODAL DE PESO */}
      <AnimatePresence>
        {editingWeight && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="modal-content text-center">
              <h2 className="retro-title text-4xl mb-4">Actualizar Peso</h2>
              <div className="bg-gray-50 p-6 rounded-3xl mb-6">
                <p className="text-gray-400 font-bold text-xs uppercase mb-2">Peso Actual: {editingWeight.currentWeight}kg</p>
                <input autoFocus type="number" className="bg-transparent text-center text-5xl font-black text-[#5d3a1a] outline-none w-full" value={editingWeight.newWeight} onChange={e => setEditingWeight({...editingWeight, newWeight: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setEditingWeight(null)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black uppercase text-sm">Cerrar</button>
                <button onClick={saveNewWeight} className="flex-1 bg-[#00d2ff] text-white py-4 rounded-2xl font-black uppercase text-sm">Guardar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE ALIMENTO */}
      <AnimatePresence>
        {recordingFeed && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="modal-content text-left space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="retro-title text-3xl text-[#5d3a1a]">Registrar Alimentación</h2>
                <Cookie className="text-[#a0744a]" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 px-2 uppercase">Seleccionar Alimento</label>
                  <select 
                    className="w-full bg-[#fdf6e3] border-4 border-[#5d3a1a] p-4 rounded-2xl font-black"
                    value={recordingFeed.alimentoId}
                    onChange={e => setRecordingFeed({...recordingFeed, alimentoId: e.target.value})}
                  >
                    {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.cantidad})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 px-2 uppercase">Cantidad (Sacos/Kilos)</label>
                  <input type="number" className="w-full bg-white border-4 border-[#5d3a1a] p-4 rounded-2xl font-black" value={recordingFeed.qty} onChange={e => setRecordingFeed({...recordingFeed, qty: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setRecordingFeed(null)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black uppercase text-sm">Cancelar</button>
                <button onClick={saveFeedConsumption} className="flex-1 bg-[#5d3a1a] text-[#f4b41b] py-4 rounded-2xl font-black uppercase text-sm">Registrar Gasto</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EnhancedLoteCard = ({ lote, onEdit, onFeed }) => {
    const growth = (lote.peso_actual || lote.peso_promedio_inicial) - lote.peso_promedio_inicial;
    return (
        <motion.div whileHover={{ y: -5 }} className="glass-card bg-white border-none p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[80px] -z-0 group-hover:bg-[#00d2ff10]" />
            <div className="w-24 h-24 bg-[#5d3a1a] rounded-[30px] flex-shrink-0 flex items-center justify-center text-[#f4b41b] shadow-lg z-10">
                <Beef size={40} />
            </div>
            <div className="flex-1 text-left z-10">
                <h3 className="retro-title text-4xl text-[#5d3a1a] leading-none mb-2">{lote.id_batch}</h3>
                <div className="flex gap-3 mb-4">
                    <span className="bg-blue-50 text-blue-500 font-black text-[9px] px-2 py-1 rounded-lg uppercase">{lote.raza}</span>
                    <span className="bg-green-50 text-green-500 font-black text-[9px] px-2 py-1 rounded-lg uppercase">Inv: C${lote.costo_inicial}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Stat icon={<Users size={14}/>} label="CABEZAS" value={lote.cantidad_actual} />
                    <Stat icon={<Scale size={14}/>} label="PESO ACT" value={`${lote.peso_actual || lote.peso_promedio_inicial}kg`} highlight />
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-32 z-10">
                <button onClick={onEdit} className="bg-[#00d2ff] text-white p-3 rounded-xl font-black text-[10px] uppercase shadow-md hover:brightness-110"><Scale size={16} className="inline mr-2"/> Peso</button>
                <button onClick={onFeed} className="bg-[#5d3a1a] text-[#f4b41b] p-3 rounded-xl font-black text-[10px] uppercase shadow-md hover:brightness-110"><Cookie size={16} className="inline mr-2"/> Comida</button>
                <div className="text-center">
                    <p className="text-xl font-black text-green-600">+{growth.toFixed(1)}kg</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Ganancia</p>
                </div>
            </div>
        </motion.div>
    );
};

const InteractiveInput = ({ icon, label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-[#a0744a] uppercase tracking-widest px-2">{label}</label>
    <div className="relative flex items-center">
        <div className="absolute left-4 text-[#a0744a]">{icon}</div>
        <input {...props} className="w-full bg-[#fdf6e3] border-4 border-[#5d3a1a] p-4 pl-12 rounded-2xl font-black text-[#5d3a1a] outline-none" />
    </div>
  </div>
);

const Stat = ({ icon, label, value, highlight }) => (
    <div className="flex items-center gap-2">
        <div className="text-gray-400">{icon}</div>
        <div>
            <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">{label}</p>
            <p className={`text-lg font-black leading-none mt-1 ${highlight ? 'text-[#00d2ff]' : 'text-[#5d3a1a]'}`}>{value}</p>
        </div>
    </div>
);

export default Cerdos;

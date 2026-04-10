import React, { useState, useEffect } from 'react';
import { getLotes, createLote } from '../services/api';
import { 
  Plus, Search, Eye, Edit3, Package, Check, X, Beef, Hash, Users, Scale, DollarSign, Calendar, AlertCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cerdos = () => {
  const [lotes, setLotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [idError, setIdError] = useState('');
  
  const [formData, setFormData] = useState({
    id_batch: '',
    raza: 'Duroc',
    cantidad_inicial: '',
    peso_promedio_inicial: '',
    costo_inicial: '',
    fecha_entrada: new Date().toISOString().split('T')[0],
    estado: 'SALUDABLE',
    ubicacion: 'Corral A-1',
    edad_inicial_semanas: 10
  });

  const razas = ['Duroc', 'Landrace', 'Large White', 'Berkshire', 'Hampshire', 'Pietrain', 'Criollo'];

  useEffect(() => {
    fetchData();
    if (!formData.id_batch) {
        setFormData(prev => ({ ...prev, id_batch: `L-${Math.floor(Math.random() * 900) + 100}` }));
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await getLotes();
      setLotes(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const calculateCurrentWeeks = (fechaEntrada, edadInicial) => {
      const entrada = new Date(fechaEntrada);
      const hoy = new Date();
      const diffTime = Math.abs(hoy - entrada);
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      return (parseInt(edadInicial) || 0) + diffWeeks;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIdError('');

    const exists = lotes.some(l => l.id_batch.toLowerCase() === formData.id_batch.toLowerCase());
    if (exists) {
        setIdError(`El ID "${formData.id_batch}" ya está en uso.`);
        return;
    }

    try {
      const dataToSend = {
        ...formData,
        cantidad_actual: formData.cantidad_inicial,
        peso_actual: formData.peso_promedio_inicial
      };
      await createLote(dataToSend);
      setShowForm(false);
      fetchData();
      setFormData({
        id_batch: `L-${Math.floor(Math.random() * 900) + 100}`,
        raza: 'Duroc',
        cantidad_inicial: '',
        peso_promedio_inicial: '',
        costo_inicial: '',
        fecha_entrada: new Date().toISOString().split('T')[0],
        estado: 'SALUDABLE',
        ubicacion: 'Corral A-1',
        edad_inicial_semanas: 10
      });
    } catch (e) {
      console.error(e);
      alert("Error al registrar lote.");
    }
  };

  const metrics = (() => {
    const totalCerdos = lotes.reduce((acc, l) => acc + (parseInt(l.cantidad_actual) || 0), 0);
    const avgWeight = lotes.length > 0 ? (lotes.reduce((acc, l) => acc + (parseFloat(l.peso_actual || l.peso_promedio_inicial) || 0), 0) / lotes.length).toFixed(1) : 0;
    const saludable = lotes.filter(l => l.estado === 'SALUDABLE' || l.estado === 'ENGORDE').length;
    return {
      totalLotes: lotes.length,
      totalCerdos: totalCerdos.toLocaleString(),
      avgWeight,
      saludable,
      observacion: lotes.filter(l => l.estado === 'OBSERVACION').length, 
      critico: lotes.filter(l => l.estado === 'REVISION').length      
    };
  })();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/40 p-6 rounded-3xl backdrop-blur-sm">
         <h1 className="text-4xl font-black text-[#5d3a1a]">Finca La Primavera</h1>
         <button 
           onClick={() => setShowForm(true)}
           className="btn-green shadow-xl"
         >
           Nuevo Ingreso +
         </button>
      </div>

      <div className="metrics-pill shadow-sm">
         <SummaryItem label="Total Lotes" value={metrics.totalLotes} />
         <SummaryItem label="Total Cerdos" value={metrics.totalCerdos} />
         <SummaryItem label="Peso Promedio" value={`${metrics.avgWeight} kg`} />
         <SummaryItem label="Saludable" value={metrics.saludable} color="text-green-600" />
         <SummaryItem label="Observación" value={metrics.observacion} color="text-amber-500" />
         <SummaryItem label="Crítico" value={metrics.critico} color="text-rose-600" />
      </div>

      <div className="exact-table-container">
        <table className="exact-table">
          <thead>
            <tr>
              <th>ID Lote</th>
              <th>Raza</th>
              <th>Cantidad</th>
              <th>Edad (Actual)</th>
              <th>Peso Promedio</th>
              <th>Estado de Salud</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote) => (
              <tr key={lote.id}>
                <td className="font-bold text-[#5d3a1a]">{lote.id_batch}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Beef size={28} className={lote.raza === 'Duroc' ? 'text-[#8c5a3c]' : 'text-[#f5cac3]'} />
                    <span className="font-bold text-slate-700">{lote.raza}</span>
                  </div>
                </td>
                <td className="font-bold">{lote.cantidad_actual}</td>
                <td className="text-slate-600 font-bold">
                   {calculateCurrentWeeks(lote.fecha_entrada, lote.edad_inicial_semanas)} semanas
                </td>
                <td className="font-black text-slate-800">{lote.peso_actual || lote.peso_promedio_inicial} kg</td>
                <td>
                  <HealthBadge status={lote.estado} />
                </td>
                <td className="font-bold text-slate-600">{lote.ubicacion || 'Corral A-3'}</td>
                <td>
                  <div className="action-group">
                    <ActionBtn icon={<Eye size={16}/>} label="Ver" />
                    <ActionBtn icon={<Edit3 size={16}/>} label="Editar" />
                    <ActionBtn icon={<Package size={16}/>} label="Mover" />
                    <ActionBtn icon={<Check size={16}/>} label="Finalizar" isFinish />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="modal-premium">
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-400"><X size={32}/></button>
              <h2>Ingresar Nuevo Lote</h2>

              <form onSubmit={handleRegister} className="form-grid">
                 <div className="form-group full-width">
                    <label>ID de Lote (Editable)</label>
                    <input 
                      className={`form-input ${idError ? 'border-rose-500' : ''}`}
                      value={formData.id_batch}
                      onChange={e => { setFormData({...formData, id_batch: e.target.value}); setIdError(''); }}
                      required
                    />
                    {idError && <p className="error-message">{idError}</p>}
                 </div>

                 <div className="form-group">
                    <label>Raza del Cerdo</label>
                    <select 
                      className="form-input"
                      value={formData.raza}
                      onChange={e => setFormData({...formData, raza: e.target.value})}
                    >
                      {razas.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                 </div>

                 <div className="form-group">
                    <label>Edad al Ingresar (semanas)</label>
                    <div className="relative">
                       <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="number" className="form-input pl-11" placeholder="Ej: 10"
                         value={formData.edad_inicial_semanas}
                         onChange={e => setFormData({...formData, edad_inicial_semanas: e.target.value})}
                         required
                       />
                    </div>
                 </div>

                 <div className="form-group">
                    <label>Cantidad Inicial</label>
                    <input 
                      type="number" className="form-input" 
                      value={formData.cantidad_inicial}
                      onChange={e => setFormData({...formData, cantidad_inicial: e.target.value})}
                      required
                    />
                 </div>

                 <div className="form-group">
                    <label>Peso Promedio (kg)</label>
                    <input 
                      type="number" step="0.1" className="form-input" 
                      value={formData.peso_promedio_inicial}
                      onChange={e => setFormData({...formData, peso_promedio_inicial: e.target.value})}
                      required
                    />
                 </div>

                 <div className="form-group">
                    <label>Inversión Inicial (C$)</label>
                    <input 
                      type="number" className="form-input" 
                      value={formData.costo_inicial}
                      onChange={e => setFormData({...formData, costo_inicial: e.target.value})}
                      required
                    />
                 </div>

                 <div className="form-group full-width">
                    <label>Fecha de Ingreso</label>
                    <input 
                      type="date" className="form-input" 
                      value={formData.fecha_entrada}
                      onChange={e => setFormData({...formData, fecha_entrada: e.target.value})}
                      required
                    />
                 </div>

                 <div className="full-width pt-6">
                    <button type="submit" className="w-full bg-[#5da05d] text-white py-4 rounded-2xl font-black text-xl shadow-xl">
                      Guardar Lote de Cerdo
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SummaryItem = ({ label, value, color = "text-slate-900" }) => (
  <div className="text-left px-4">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

const HealthBadge = ({ status }) => {
  const dictionary = {
    'SALUDABLE': { label: 'Saludable', icon: '❤', class: 'badge-saludable' },
    'OBSERVACION': { label: 'Observación', icon: '⚠', class: 'badge-observacion' },
    'REVISION': { label: 'Revisión', icon: '🩺', class: 'badge-revision' },
    'ENGORDE': { label: 'Saludable', icon: '❤', class: 'badge-saludable' }
  };
  const data = dictionary[status] || dictionary['SALUDABLE'];
  return (
    <span className={`health-badge ${data.class}`}>
      <span>{data.icon}</span> {data.label}
    </span>
  );
};

const ActionBtn = ({ icon, label, isFinish }) => (
  <button className={`action-btn ${isFinish ? 'finish' : ''}`}>
    {icon}
    <span>{label}</span>
  </button>
);

export default Cerdos;

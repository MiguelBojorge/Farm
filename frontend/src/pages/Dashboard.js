import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, Cell
} from 'recharts';
import { 
  TrendingUp, Activity, DollarSign, PieChart, Info, BarChart3, ChevronRight
} from 'lucide-react';
import { getLotes, getTransacciones } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [lotes, setLotes] = useState([]);
  const [metrics, setMetrics] = useState({ cerdos: 0, pesoTotal: 0, ingresos: 0, balance: 0 });
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resLotes, resTrans] = await Promise.all([getLotes(), getTransacciones()]);
      const dataLotes = resLotes.data;
      setLotes(dataLotes);

      // Calcular Métricas
      const totalCerdos = dataLotes.reduce((acc, l) => acc + (parseInt(l.cantidad_actual) || 0), 0);
      const totalPeso = dataLotes.reduce((acc, l) => acc + (parseFloat(l.peso_actual || l.peso_promedio_inicial) || 0), 0);
      const totalIngresos = resTrans.data.filter(t => t.tipo === 'INGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);
      const totalEgresos = resTrans.data.filter(t => t.tipo === 'EGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);

      setMetrics({
        cerdos: totalCerdos,
        pesoTotal: totalPeso,
        ingresos: totalIngresos,
        balance: totalIngresos - totalEgresos
      });

      // Datos de Crecimiento (Comparativa Inicial vs Actual) - Mostrar top 10 lotes
      const gData = dataLotes.slice(0, 10).map(l => ({
          name: l.id_batch,
          inicial: parseFloat(l.peso_promedio_inicial),
          actual: parseFloat(l.peso_actual || l.peso_promedio_inicial),
          ganancia: (parseFloat(l.peso_actual || l.peso_promedio_inicial) - parseFloat(l.peso_promedio_inicial)).toFixed(1)
      }));
      setGrowthData(gData);

    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border border-[#e2e2d5] shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-[#5d3a1a]">Visión de Rentabilidad</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Finca la Primavera - Análisis Operativo</p>
        </div>
        <div className="bg-[#fcfaf7] px-6 py-3 rounded-2xl border border-[#e2e2d5] flex items-center gap-3">
            <Activity className="text-[#4c7c4c]" />
            <span className="font-bold text-[#5d3a1a]">Estado: Operativo 100%</span>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CABEZAS ACTIVAS" value={metrics.cerdos} icon={<TrendingUp color="#4c7c4c"/>} />
        <StatCard title="BIOMASA (KG)" value={metrics.pesoTotal.toFixed(1)} icon={<Activity color="#4c7c4c"/>} />
        <StatCard title="TOTAL INVERSIÓN" value={`C$${Math.abs(metrics.balance).toLocaleString()}`} icon={<DollarSign color="#991b1b"/>} isNegative={metrics.balance < 0} />
        <StatCard title="BALANCE NETO" value={`C$${metrics.balance.toLocaleString()}`} icon={<PieChart color="#5d3a1a"/>} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* GROWTH CHART - FULL WIDTH */}
        <div className="white-card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-700">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#5d3a1a]">Desarrollo de Biomasa por Lote</h3>
                <p className="text-xs text-slate-400 font-bold uppercase">Comparativa de peso promedio (Entrada vs Actual)</p>
              </div>
            </div>
            <Link to="/finanzas" className="flex items-center gap-2 text-sm font-black text-[#5d3a1a] bg-[#f9f6f2] px-4 py-2 rounded-xl hover:bg-[#5d3a1a] hover:text-white transition-all">
                Ver Finanzas <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ height: '450px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8c7851', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8c7851', fontSize: 12, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#fcfcfc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="inicial" name="Peso Entrada (kg)" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" name="Peso Actual (kg)" fill="#4c7c4c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, isNegative }) => (
  <div className="white-card flex flex-col items-center text-center">
    <div className={`p-3 rounded-full mb-4 border border-[#e2e2d5] ${isNegative ? 'bg-rose-50' : 'bg-[#f9f6f2]'}`}>
      {icon}
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <h4 className={`text-2xl font-black ${isNegative ? 'text-rose-600' : 'text-[#5d3a1a]'}`}>{value}</h4>
  </div>
);

export default Dashboard;

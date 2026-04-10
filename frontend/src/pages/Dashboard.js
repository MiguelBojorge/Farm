import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend
} from 'recharts';
import { 
  TrendingUp, Activity, DollarSign, PieChart, Info
} from 'lucide-react';
import { getLotes, getTransacciones } from '../services/api';

const Dashboard = () => {
  const [lotes, setLotes] = useState([]);
  const [metrics, setMetrics] = useState({ cerdos: 0, pesoTotal: 0, ingresos: 0, balance: 0 });
  const [financeData, setFinanceData] = useState([]);

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

      // Finanzas Simplificadas
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      const monthlyData = months.map(m => ({ name: m, ingresos: 0, egresos: 0 }));
      resTrans.data.forEach(t => {
          const mIdx = new Date(t.fecha).getMonth();
          if (mIdx < 6) {
              if (t.tipo === 'INGRESO') monthlyData[mIdx].ingresos += parseFloat(t.monto);
              else monthlyData[mIdx].egresos += parseFloat(t.monto);
          }
      });
      setFinanceData(monthlyData);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER WITHOUT MOCK AVATARS */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border border-[#e2e2d5] shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-[#5d3a1a]">Visión de Rentabilidad</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Finca la Primavera - Análisis Operativo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CABEZAS ACTIVAS" value={metrics.cerdos} icon={<TrendingUp color="#4c7c4c"/>} />
        <StatCard title="BIOMASA (KG)" value={metrics.pesoTotal.toFixed(1)} icon={<Activity color="#4c7c4c"/>} />
        <StatCard title="INGRESOS BRUTOS" value={`C$${metrics.ingresos.toLocaleString()}`} icon={<DollarSign color="#4c7c4c"/>} />
        <StatCard title="BALANCE NETO" value={`C$${metrics.balance.toLocaleString()}`} icon={<PieChart color="#4c7c4c"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 white-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-[#5d3a1a]">Comparativa P&L (Semestral)</h3>
            <div className="bg-slate-50 p-2 rounded-xl text-slate-300">
               <Info size={18} />
            </div>
          </div>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e2d5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8c7851', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8c7851', fontSize: 12, fontWeight: 700}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e2d5', background: 'white' }} />
                <Legend iconType="circle" />
                <Bar dataKey="ingresos" name="Ingresos" fill="#4c7c4c" radius={[6, 6, 0, 0]} />
                <Bar dataKey="egresos" name="Egresos" fill="#991b1b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="white-card flex flex-col items-center text-center">
    <div className="bg-[#f9f6f2] p-3 rounded-full mb-4 border border-[#e2e2d5]">
      {icon}
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <h4 className="text-2xl font-black text-[#5d3a1a]">{value}</h4>
  </div>
);

export default Dashboard;

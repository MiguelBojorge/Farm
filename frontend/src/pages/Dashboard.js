import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, Legend
} from 'recharts';
import { TrendingUp, DollarSign, Activity, ShoppingCart, ChevronDown, PieChart } from 'lucide-react';
import { getLotes, getVentas, getTransacciones } from '../services/api';

const Dashboard = () => {
  const [lotes, setLotes] = useState([]);
  const [selectedLoteId, setSelectedLoteId] = useState('promedio');
  const [metrics, setMetrics] = useState({
    cerdos: 0,
    pesoTotal: 0,
    ventasProyectadas: 0,
    gananciaMeta: 0,
  });

  const [growthData, setGrowthData] = useState([]);
  const [financeData, setFinanceData] = useState([
    { name: 'Ene', ingresos: 4000, egresos: 2400 },
    { name: 'Feb', ingresos: 3000, egresos: 1398 },
    { name: 'Mar', ingresos: 2000, egresos: 9800 },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resLotes, resVentas, resTrans] = await Promise.all([
        getLotes(), getVentas(), getTransacciones()
      ]);
      
      const dataLotes = resLotes.data;
      setLotes(dataLotes);

      // Calcular Métricas
      const totalCerdos = dataLotes.reduce((acc, l) => acc + l.cantidad_actual, 0);
      const totalPeso = dataLotes.reduce((acc, l) => acc + (l.peso_actual || l.peso_promedio_inicial), 0);
      const totalIngresos = resTrans.data.filter(t => t.tipo === 'INGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);
      const totalEgresos = resTrans.data.filter(t => t.tipo === 'EGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);

      setMetrics({
        cerdos: totalCerdos,
        pesoTotal: totalPeso,
        ventasProyectadas: totalPeso * 45,
        gananciaMeta: totalIngresos - totalEgresos
      });

      // Agrupar Finanzas Mensuales para la Gráfica de Columnas
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      const monthlyData = months.map(m => ({ name: m, ingresos: 0, egresos: 0 }));
      
      resTrans.data.forEach(t => {
          const monthIdx = new Date(t.fecha).getMonth();
          if (monthIdx < 6) {
              if (t.tipo === 'INGRESO') monthlyData[monthIdx].ingresos += parseFloat(t.monto);
              else monthlyData[monthIdx].egresos += parseFloat(t.monto);
          }
      });
      setFinanceData(monthlyData);

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedLoteId === 'promedio') {
       setGrowthData([
        { name: 'Sem 1', peso: 5.5 },
        { name: 'Sem 2', peso: 14.8 },
        { name: 'Sem 3', peso: 28.2 },
        { name: 'Sem 4', peso: 45.0 },
       ]);
    } else {
       const lote = lotes.find(l => l.id.toString() === selectedLoteId);
       if (lote && lote.historial_pesos && lote.historial_pesos.length > 0) {
          const mapped = lote.historial_pesos.map((p, idx) => ({
             name: `H-${idx + 1}`,
             peso: p.peso
          }));
          setGrowthData(mapped);
       } else if (lote) {
         setGrowthData([
           { name: 'Entrada', peso: lote.peso_promedio_inicial },
           { name: 'Actual', peso: lote.peso_actual || lote.peso_promedio_inicial }
         ]);
       }
    }
  }, [selectedLoteId, lotes]);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="retro-title text-7xl text-[#5d3a1a]">CONTROL DE RENTABILIDAD</h1>
        <p className="text-[#a0744a] font-black uppercase text-[10px] tracking-widest mt-2">Visión 360°: Ventas, Gastos y Biomasa - Nicaragua</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard title="CABEZAS EN CORRAL" value={metrics.cerdos} icon={<TrendingUp />} color="bg-[#e0fbff]" />
        <MetricCard title="BIOMASA TOTAL (KG)" value={metrics.pesoTotal.toFixed(1)} icon={<Activity />} color="bg-[#fff0f0]" />
        <MetricCard title="VALOR CIERRE (C$)" value={metrics.ventasProyectadas.toLocaleString()} icon={<DollarSign />} color="bg-[#fff9db]" />
        <MetricCard title="GANANCIA NETA" value={`C$${metrics.gananciaMeta.toLocaleString()}`} icon={<PieChart />} color="bg-[#f0f5ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* GRÁFICA DE RENTABILIDAD (COLUMNAS) */}
        <div className="glass-card">
          <h3 className="retro-title text-2xl mb-8 text-[#5d3a1a]">Comparativa P&L (Mensual)</h3>
          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f0f0f0'}} />
                <Legend iconType="circle" />
                <Bar dataKey="ingresos" name="Ventas (C$)" fill="#00d2ff" radius={[10, 10, 0, 0]} />
                <Bar dataKey="egresos" name="Gastos (C$)" fill="#ff6b6b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase">Incluye: Ventas, Inversión Inicial y Alimento mensual</p>
        </div>

        {/* GRÁFICA DE CRECIMIENTO */}
        <div className="glass-card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="retro-title text-2xl text-[#5d3a1a]">Ganancia de Peso</h3>
            <select 
                value={selectedLoteId}
                onChange={(e) => setSelectedLoteId(e.target.value)}
                className="bg-[#fdf6e3] border-4 border-[#5d3a1a] rounded-2xl px-4 py-2 font-black text-xs text-[#5d3a1a] outline-none"
            >
                <option value="promedio">PROMEDIO</option>
                {lotes.map(l => <option key={l.id} value={l.id}>{l.id_batch}</option>)}
            </select>
          </div>
          
          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="peso" stroke="#00d2ff" strokeWidth={4} fillOpacity={1} fill="url(#colorPeso)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => (
    <div className={`glass-card ${color} border-none`}>
        <div className="flex justify-between items-center">
            <div className="text-left">
                <p className="text-gray-500 font-bold text-[9px] uppercase tracking-wider mb-1">{title}</p>
                <h4 className="readable-number text-3xl text-gray-800 tracking-tighter">{value}</h4>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl shadow-sm text-[#5d3a1a]">
                {icon}
            </div>
        </div>
    </div>
);

export default Dashboard;

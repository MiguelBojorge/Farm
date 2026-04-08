import React, { useState, useEffect } from 'react';
import { getTransacciones } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Wallet, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Finanzas = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [resumen, setResumen] = useState({ ingresos: 0, egresos: 0, balance: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchFinanzas();
  }, []);

  const fetchFinanzas = async () => {
    try {
      const res = await getTransacciones();
      const data = res.data;
      setTransacciones(data);
      
      const ingresos = data.filter(t => t.tipo === 'INGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);
      const egresos = data.filter(t => t.tipo === 'EGRESO').reduce((acc, t) => acc + parseFloat(t.monto), 0);
      
      setResumen({ ingresos, egresos, balance: ingresos - egresos });

      // Agrupar por Mes para la gráfica
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      const monthly = months.map(m => ({ name: m, ingresos: 0, egresos: 0 }));
      data.forEach(t => {
          const mIdx = new Date(t.fecha).getMonth();
          if (mIdx < 6) {
              if (t.tipo === 'INGRESO') monthly[mIdx].ingresos += parseFloat(t.monto);
              else monthly[mIdx].egresos += parseFloat(t.monto);
          }
      });
      setChartData(monthly);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="text-center border-b-8 border-[#5d3a1a] pb-8">
        <h1 className="retro-title text-7xl text-[#5d3a1a]">ESTADOS FINANCIEROS</h1>
        <p className="text-[#a0744a] font-black uppercase text-[10px] tracking-widest mt-2 flex justify-center gap-2">
            <Wallet size={14}/> Libro Mayor y Balance General - Nicaragua
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FinanceCard title="TOTAL INGRESOS" value={resumen.ingresos} icon={<ArrowUpCircle />} color="bg-blue-50 text-blue-600" />
        <FinanceCard title="TOTAL EGRESOS" value={resumen.egresos} icon={<ArrowDownCircle />} color="bg-red-50 text-red-600" />
        <FinanceCard title="BALANCE NETO" value={resumen.balance} icon={<DollarSign />} color="bg-[#fff9db] text-[#5d3a1a]" highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card">
          <h3 className="retro-title text-3xl mb-8 text-[#5d3a1a]">Rendimiento Mensual (P&L)</h3>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: '#f9f9f9'}} />
                <Legend />
                <Bar dataKey="ingresos" name="Ingresos (C$)" fill="#00d2ff" radius={[10, 10, 0, 0]} />
                <Bar dataKey="egresos" name="Gastos (C$)" fill="#ff6b6b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 farm-board-container !m-0 !p-8 bg-white/80 overflow-hidden">
          <h3 className="retro-title text-2xl mb-6 flex items-center gap-3"><FileText /> Auditoría</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {transacciones.map(t => (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={t.id} className="bg-white border-2 border-gray-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                <div className="text-left">
                    <p className="text-[8px] font-black text-gray-400 uppercase">{t.fecha}</p>
                    <p className="font-black text-[#5d3a1a] text-xs leading-tight uppercase">{t.descripcion}</p>
                </div>
                <div className="text-right">
                    <p className={`font-black text-sm ${t.tipo === 'INGRESO' ? 'text-blue-500' : 'text-red-500'}`}>
                        {t.tipo === 'INGRESO' ? '+' : '-'}C${parseFloat(t.monto).toLocaleString()}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-8 bg-[#5d3a1a] text-[#f4b41b] py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2">
            <Download size={18}/> EXPORTAR PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const FinanceCard = ({ title, value, icon, color, highlight }) => (
    <div className={`glass-card ${color} border-none flex items-center justify-between p-8`}>
        <div className="text-left">
            <p className="font-bold text-[10px] opacity-60 uppercase mb-1">{title}</p>
            <h4 className={`readable-number ${highlight ? 'text-5xl' : 'text-3xl'} font-black text-inherit tracking-tighter`}>C${value.toLocaleString()}</h4>
        </div>
        <div className="p-4 bg-white/40 rounded-2xl">
            {icon}
        </div>
    </div>
);

export default Finanzas;

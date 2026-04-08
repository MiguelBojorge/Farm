import React, { useState } from 'react';
import CultivosList from '../components/CultivosList';
import CultivoForm from '../components/CultivoForm';

const Cultivos = () => {
  const [refresh, setRefresh] = useState(0);

  const handleAdded = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="content-wrapper">
      <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Control de Cultivos</h2>
      
      <div className="max-w-4xl mx-auto">
        <CultivoForm onAdded={handleAdded} />
        <CultivosList refresh={refresh} />
      </div>

      <div className="mt-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">📍 Gestión Regional (Nicaragua)</h3>
        <p className="opacity-80">
          En Nicaragua, la unidad de **Manzana (Mnz)** es estándar para medir áreas de siembra. 
          Asegúrate de registrar la fecha de siembra exacta para proyectar la fecha de cosecha de las papayas y plátanos.
        </p>
      </div>
    </div>
  );
};

export default Cultivos;


import React from 'react';

const PatientHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 rounded-lg shadow-md text-white mb-6">
      <h1 className="text-3xl font-bold">Pacientes</h1>
      <p className="mt-2 opacity-90">
        Gerencie seus pacientes, notas clínicas e documentos.
      </p>
    </div>
  );
};

export default PatientHeader;

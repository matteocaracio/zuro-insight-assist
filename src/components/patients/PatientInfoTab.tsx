
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Patient } from './types';

interface PatientInfoTabProps {
  patient: Patient;
}

const PatientInfoTab: React.FC<PatientInfoTabProps> = ({ patient }) => {
  return (
    <TabsContent value="info" className="p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">E-mail</p>
          <p className="font-medium">{patient.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Telefone</p>
          <p className="font-medium">{patient.phone}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Última Consulta</p>
          <p className="font-medium">{patient.lastVisit || "N/A"}</p>
        </div>
      </div>
    </TabsContent>
  );
};

export default PatientInfoTab;


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Patient } from './types';

interface PatientNotesProps {
  patient: Patient;
  patientNotes: string;
  setPatientNotes: (notes: string) => void;
  handleOpenNotes: (patient: Patient) => void;
  handleSaveNotes: () => void;
  selectedPatientForNotes: Patient | null;
}

const PatientNotes: React.FC<PatientNotesProps> = ({
  patient,
  patientNotes,
  setPatientNotes,
  handleOpenNotes,
  handleSaveNotes,
  selectedPatientForNotes
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Notas de Consulta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notas de Consulta - {patient.name}</DialogTitle>
          <DialogDescription>
            Anote informações importantes para as próximas consultas.
          </DialogDescription>
        </DialogHeader>
        <Textarea 
          value={selectedPatientForNotes?.id === patient.id ? patientNotes : ""} 
          onChange={e => setPatientNotes(e.target.value)} 
          placeholder="Digite suas anotações aqui..." 
          className="min-h-[200px]" 
          onClick={() => !selectedPatientForNotes && handleOpenNotes(patient)} 
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white" 
            onClick={() => {
              handleOpenNotes(patient);
              handleSaveNotes();
            }}
          >
            Salvar Notas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientNotes;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AddPatientDialog from './AddPatientDialog';
import PatientNotes from './PatientNotes';
import { Patient } from './types';

interface PatientsListProps {
  patients: Patient[];
  filteredPatients: Patient[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setCurrentPatient: (patient: Patient | null) => void;
  handleDeletePatient: (id: number) => void;
  newPatient: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
  };
  setNewPatient: (patient: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
  }) => void;
  handleAddPatient: () => void;
  patientNotes: string;
  setPatientNotes: (notes: string) => void;
  handleOpenNotes: (patient: Patient) => void;
  handleSaveNotes: () => void;
  selectedPatientForNotes: Patient | null;
}

const PatientsList: React.FC<PatientsListProps> = ({
  patients,
  filteredPatients,
  searchTerm,
  setSearchTerm,
  setCurrentPatient,
  handleDeletePatient,
  newPatient,
  setNewPatient,
  handleAddPatient,
  patientNotes,
  setPatientNotes,
  handleOpenNotes,
  handleSaveNotes,
  selectedPatientForNotes
}) => {
  return (
    <Card className="shadow-lg border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-purple-800">Lista de Pacientes</CardTitle>
          <AddPatientDialog 
            newPatient={newPatient}
            setNewPatient={setNewPatient}
            handleAddPatient={handleAddPatient}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar pacientes..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10 border-purple-200 focus:border-purple-400" 
            />
          </div>
        </div>
        
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead className="hidden md:table-cell">E-mail</TableHead>
                <TableHead className="hidden md:table-cell">Tel</TableHead>
                <TableHead className="hidden md:table-cell">Última Visita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                    Nenhum paciente encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map(patient => (
                  <TableRow key={patient.id} className="hover:bg-purple-50/50">
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.cpf}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.lastVisit || "—"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={patient.status === "Ativo" ? "default" : "secondary"} 
                        className={`${patient.status === "Ativo" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <PatientNotes 
                          patient={patient}
                          patientNotes={patientNotes}
                          setPatientNotes={setPatientNotes}
                          handleOpenNotes={handleOpenNotes}
                          handleSaveNotes={handleSaveNotes}
                          selectedPatientForNotes={selectedPatientForNotes}
                        />
                        
                        <Button variant="ghost" size="sm" onClick={() => setCurrentPatient(patient)}>
                          Ver Detalhes
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Excluir
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o paciente {patient.name}? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeletePatient(patient.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/80">
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-gray-50 py-3">
        <p className="text-sm text-gray-500">
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </p>
      </CardFooter>
    </Card>
  );
};

export default PatientsList;

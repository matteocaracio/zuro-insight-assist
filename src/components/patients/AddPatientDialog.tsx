
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCPF, formatPhone } from './utils';
import { useToast } from '@/hooks/use-toast';
import { Patient } from './types';

interface AddPatientDialogProps {
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
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ 
  newPatient, 
  setNewPatient, 
  handleAddPatient 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Adicionar Novo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Paciente</DialogTitle>
          <DialogDescription>
            Preencha os dados do paciente para cadastro.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
            <Input 
              id="name" 
              placeholder="Nome completo do paciente" 
              value={newPatient.name} 
              onChange={e => setNewPatient({
                ...newPatient,
                name: e.target.value
              })} 
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="cpf" className="text-sm font-medium">CPF</label>
            <Input 
              id="cpf" 
              placeholder="000.000.000-00" 
              value={newPatient.cpf} 
              onChange={e => setNewPatient({
                ...newPatient,
                cpf: formatCPF(e.target.value)
              })} 
              maxLength={14} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@exemplo.com" 
                value={newPatient.email} 
                onChange={e => setNewPatient({
                  ...newPatient,
                  email: e.target.value
                })} 
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
              <Input 
                id="phone" 
                placeholder="(00) 00000-0000" 
                value={newPatient.phone} 
                onChange={e => setNewPatient({
                  ...newPatient,
                  phone: formatPhone(e.target.value)
                })} 
                maxLength={15} 
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white" 
            onClick={() => {
              handleAddPatient();
            }}
          >
            Cadastrar Paciente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;

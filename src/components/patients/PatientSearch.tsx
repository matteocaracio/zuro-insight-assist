
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { formatCPF } from './utils';
import { useToast } from '@/hooks/use-toast';
import { Patient } from './types';

interface PatientSearchProps {
  searchCPF: string;
  setSearchCPF: (value: string) => void;
  setCurrentPatient: (patient: Patient | null) => void;
  patients: Patient[];
}

const PatientSearch: React.FC<PatientSearchProps> = ({ 
  searchCPF, 
  setSearchCPF, 
  setCurrentPatient, 
  patients 
}) => {
  const { toast } = useToast();

  const handleSearchCPF = () => {
    const formattedCPF = formatCPF(searchCPF);
    setSearchCPF(formattedCPF);

    // Search patient by CPF
    const found = patients.find(p => p.cpf === formattedCPF);
    if (found) {
      setCurrentPatient(found);
      toast({
        title: "Paciente encontrado!",
        description: `Dados de ${found.name} carregados com sucesso.`
      });
    } else if (formattedCPF.length >= 14) {
      toast({
        title: "Paciente não encontrado",
        description: "Este CPF não está cadastrado no sistema.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-lg border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
        <CardTitle className="text-purple-800">Busca Rápida de Paciente</CardTitle>
        <CardDescription>
          Digite o CPF para carregar rapidamente os dados do paciente.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex space-x-4">
          <Input 
            value={searchCPF} 
            onChange={e => setSearchCPF(formatCPF(e.target.value))} 
            placeholder="Ex: 123.456.789-00" 
            className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400" 
            maxLength={14} 
          />
          <Button onClick={handleSearchCPF} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSearch;

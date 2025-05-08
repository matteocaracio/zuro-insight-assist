
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AITypes } from './types';

interface AIInputFormProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  profession: AITypes.ProfessionType;
  setProfession: React.Dispatch<React.SetStateAction<AITypes.ProfessionType>>;
  onGenerate: () => void;
  onHistoryClick: () => void;
  loading: boolean;
}

export const AIInputForm: React.FC<AIInputFormProps> = ({
  input,
  setInput,
  profession,
  setProfession,
  onGenerate,
  onHistoryClick,
  loading
}) => {
  const getPlaceholderText = () => {
    switch (profession) {
      case 'nutritionist':
        return "Ex: Paciente de 35 anos, com rotina de trabalho intensa, sem tempo para preparar refeições. Consome fast-food 4x por semana. Objetivo: melhorar qualidade alimentar sem comprometer tempo.";
      case 'psychologist':
        return "Ex: Paciente de 28 anos apresentando episódios frequentes de ansiedade, com preocupação excessiva sobre vários aspectos da vida, dificuldade para dormir e tensão muscular. Sintomas presentes há 8 meses.";
      case 'physician':
        return "Ex: Paciente de 52 anos, com pressão arterial de 148/94 mmHg em medições repetidas. IMC 28, sedentário, histórico familiar de hipertensão. Sem outras comorbidades conhecidas.";
      case 'dentist':
        return "Ex: Paciente de 42 anos com sangramento gengival durante escovação, sensibilidade ao frio e quente, última visita ao dentista há 3 anos. Escova os dentes 2x ao dia, não usa fio dental.";
      default: // physio
        return "Ex: Paciente com dor lombar há 3 semanas, principalmente ao se levantar pela manhã. Trabalha 8h por dia sentado. Já tentou alongamentos básicos, mas a dor persiste. Objetivo: retornar às atividades normais e prevenir recorrência.";
    }
  };

  return (
    <Card className="shadow-md border-gray-200">
      <CardHeader>
        <CardTitle>Descreva os sintomas e objetivos</CardTitle>
        <CardDescription>Quanto mais detalhes você fornecer, melhor ficará a análise!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Área profissional</label>
          <Select value={profession} onValueChange={(value: AITypes.ProfessionType) => setProfession(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a área profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physio">Fisioterapia</SelectItem>
              <SelectItem value="nutritionist">Nutrição</SelectItem>
              <SelectItem value="psychologist">Psicologia</SelectItem>
              <SelectItem value="physician">Medicina</SelectItem>
              <SelectItem value="dentist">Odontologia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Textarea 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder={getPlaceholderText()} 
          className="min-h-[150px] zuro-textarea" 
        />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button
            variant="outline"
            onClick={onHistoryClick}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Histórico
          </Button>
          
          <Button 
            onClick={onGenerate} 
            disabled={loading} 
            className="bg-zuro hover:bg-zuro-dark text-white"
          >
            {loading ? (
              <>
                <div className="animate-pulse-light mr-2 h-4 w-4 rounded-full bg-white"></div>
                Gerando Análise...
              </>
            ) : (
              <>
                Gerar análise com IA
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

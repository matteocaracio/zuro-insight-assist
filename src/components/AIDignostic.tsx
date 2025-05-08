
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';
import { AIResultPanel } from './ai-diagnostic/AIResultPanel';
import { AIInputForm } from './ai-diagnostic/AIInputForm';
import { AITypes } from './ai-diagnostic/types';
import { generateMockResponse } from './ai-diagnostic/mockResponses';
import { HistoryDialog } from './ai-diagnostic/HistoryDialog';

const AIRecommendation = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState<AITypes.ProfessionType>('physio');
  const [results, setResults] = useState<AITypes.AIResult | null>(null);
  const { toast } = useToast();
  
  const handleGeneratePlan = async () => {
    if (input.trim().length < 10) {
      toast({
        title: "Entrada muito curta",
        description: "Por favor, forneça mais detalhes sobre os sintomas ou objetivos do paciente.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real application, this would be an API call to a backend service
      // For demonstration, we'll simulate different responses based on the selected profession
      setTimeout(() => {
        const mockResult = generateMockResponse(profession, input);
        setResults(mockResult);
        
        // Save to localStorage for persistence
        const savedDiagnoses = JSON.parse(localStorage.getItem('aiDiagnoses') || '[]');
        savedDiagnoses.push({
          id: Date.now(),
          profession,
          input,
          result: mockResult,
          date: new Date().toISOString()
        });
        localStorage.setItem('aiDiagnoses', JSON.stringify(savedDiagnoses));
        
        setLoading(false);
        
        toast({
          title: "Diagnóstico gerado",
          description: "O diagnóstico foi salvo no histórico."
        });
      }, 2000);
    } catch (error) {
      console.error('Error generating AI recommendation:', error);
      toast({
        title: "Erro ao gerar recomendações",
        description: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleLoadHistory = (historyItem: AITypes.DiagnosisHistory) => {
    setInput(historyItem.input);
    setProfession(historyItem.profession);
    setResults(historyItem.result);
    
    toast({
      title: "Diagnóstico carregado",
      description: "Um diagnóstico anterior foi carregado com sucesso."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Diagnóstico e Plano Automatizado por IA</h1>
        <p className="mt-2 text-gray-600">
          Descreva os sintomas e os objetivos para receber direcionamento personalizado gerado por nossa Inteligência Artificial Zuro
        </p>
      </div>
      
      <div className="flex justify-end">
        <HistoryDialog 
          trigger={
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Histórico
            </Button>
          }
          onSelectDiagnosis={handleLoadHistory}
        />
      </div>
      
      <AIInputForm
        input={input}
        setInput={setInput}
        profession={profession}
        setProfession={setProfession}
        onGenerate={handleGeneratePlan}
        loading={loading}
      />

      {results && (
        <AIResultPanel 
          results={results} 
          profession={profession} 
        />
      )}
    </div>
  );
};

export default AIRecommendation;

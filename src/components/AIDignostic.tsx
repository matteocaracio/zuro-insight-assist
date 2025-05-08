
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowRight, 
  Copy, 
  BookText, 
  FileText, 
  ChartLine, 
  FileSearch,
  Brain, 
  UserMinus, 
  FileCheck 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AIResultPanel } from './ai-diagnostic/AIResultPanel';
import { AIInputForm } from './ai-diagnostic/AIInputForm';
import { AITypes } from './ai-diagnostic/types';
import { generateMockResponse } from './ai-diagnostic/mockResponses';

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

  const handleHistoryDialog = () => {
    const savedDiagnoses = JSON.parse(localStorage.getItem('aiDiagnoses') || '[]');
    if (savedDiagnoses.length > 0) {
      toast({
        title: "Histórico disponível",
        description: `Você tem ${savedDiagnoses.length} diagnósticos salvos.`
      });
    } else {
      toast({
        title: "Nenhum histórico",
        description: "Você ainda não gerou nenhum diagnóstico."
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Diagnóstico e Plano Automatizado por IA</h1>
        <p className="mt-2 text-gray-600">
          Descreva os sintomas e os objetivos para receber direcionamento personalizado gerado por nossa Inteligência Artificial Zuro
        </p>
      </div>
      
      <AIInputForm
        input={input}
        setInput={setInput}
        profession={profession}
        setProfession={setProfession}
        onGenerate={handleGeneratePlan}
        onHistoryClick={handleHistoryDialog}
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

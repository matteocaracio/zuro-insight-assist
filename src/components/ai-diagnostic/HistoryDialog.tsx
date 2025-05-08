
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FileText, Trash, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AITypes } from './types';

interface HistoryDialogProps {
  trigger: React.ReactNode;
  onSelectDiagnosis: (history: AITypes.DiagnosisHistory) => void;
}

const getProfessionLabel = (profession: AITypes.ProfessionType): string => {
  const labels = {
    physio: 'Fisioterapia',
    nutritionist: 'Nutrição',
    psychologist: 'Psicologia',
    physician: 'Medicina',
    dentist: 'Odontologia'
  };
  return labels[profession] || profession;
};

export const HistoryDialog: React.FC<HistoryDialogProps> = ({ trigger, onSelectDiagnosis }) => {
  const [history, setHistory] = useState<AITypes.DiagnosisHistory[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadHistory();
    }
  }, [open]);

  const loadHistory = () => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('aiDiagnoses') || '[]');
      setHistory(savedHistory);
    } catch (error) {
      console.error('Error loading history:', error);
      setHistory([]);
    }
  };

  const handleDeleteItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      localStorage.setItem('aiDiagnoses', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      toast({
        title: "Item removido",
        description: "O diagnóstico foi removido do histórico."
      });
    } catch (error) {
      console.error('Error deleting history item:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover o diagnóstico.",
        variant: "destructive"
      });
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.setItem('aiDiagnoses', JSON.stringify([]));
      setHistory([]);
      toast({
        title: "Histórico limpo",
        description: "Todos os diagnósticos foram removidos do histórico."
      });
    } catch (error) {
      console.error('Error clearing history:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao limpar o histórico.",
        variant: "destructive"
      });
    }
  };

  const handleSelectDiagnosis = (diagnosis: AITypes.DiagnosisHistory) => {
    onSelectDiagnosis(diagnosis);
    setOpen(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Diagnósticos
          </DialogTitle>
          <DialogDescription>
            Visualize e carregue diagnósticos anteriores gerados pela IA.
          </DialogDescription>
        </DialogHeader>
        
        {history.length > 0 ? (
          <>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {history.map((item) => (
                  <Card 
                    key={item.id} 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSelectDiagnosis(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{getProfessionLabel(item.profession)}</div>
                          <div className="text-sm text-gray-500">{formatDate(item.date)}</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => handleDeleteItem(item.id, e)}
                        >
                          <Trash className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                      <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                        {item.input}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClearHistory}>
                Limpar histórico
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum histórico</h3>
            <p className="mt-2 text-sm text-gray-500">
              Você ainda não gerou nenhum diagnóstico pela IA.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

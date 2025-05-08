
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Patient } from './types';

interface PatientAITabProps {
  patient: Patient;
  aiAnalysis: string | null;
  loadingAI: boolean;
  handleGenerateAIRecommendations: () => void;
}

const PatientAITab: React.FC<PatientAITabProps> = ({ 
  aiAnalysis, 
  loadingAI, 
  handleGenerateAIRecommendations 
}) => {
  const { toast } = useToast();
  
  return (
    <TabsContent value="ai" className="p-6">
      <div className="space-y-6">
        {!aiAnalysis ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <div className="mb-4">
              <FileText className="h-12 w-12 mx-auto text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Análise de IA</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              Nossa IA pode analisar os dados e documentos do paciente para gerar recomendações personalizadas.
            </p>
            <Button onClick={handleGenerateAIRecommendations} disabled={loadingAI} className="bg-purple-600 hover:bg-purple-700 text-white">
              {loadingAI ? (
                <>
                  <div className="animate-pulse mr-2 h-4 w-4 rounded-full bg-white"></div>
                  Analisando dados...
                </>
              ) : (
                <>
                  Gerar Recomendações com IA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <Card className="border-purple-100">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-purple-800">Recomendações da IA</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    navigator.clipboard.writeText(aiAnalysis);
                    toast({
                      title: "Copiado!",
                      description: "Recomendações copiadas para a área de transferência."
                    });
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </Button>
              </div>
              <CardDescription>
                Baseado nos dados e histórico do paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="whitespace-pre-line text-gray-700 bg-white p-4 rounded-md border border-gray-100 shadow-sm">
                {aiAnalysis}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 text-xs text-gray-500 py-3">
              <p>Gerado em {new Date().toLocaleString()} · Esta análise automatizada não substitui o julgamento profissional.</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </TabsContent>
  );
};

export default PatientAITab;

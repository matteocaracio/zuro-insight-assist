
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, BookText, FileText, ChartLine, FileSearch, Brain, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AITypes } from './types';
import { NutritionPlanTab } from './tabs/NutritionPlanTab';
import { ResourcesTab } from './tabs/ResourcesTab';
import { TreatmentPlanTab } from './tabs/TreatmentPlanTab';
import { ReferencesTab } from './tabs/ReferencesTab';
import { ContextAnalysisTab } from './tabs/ContextAnalysisTab';
import { RecommendationsTab } from './tabs/RecommendationsTab';

interface AIResultPanelProps {
  results: AITypes.AIResult;
  profession: AITypes.ProfessionType;
}

export const AIResultPanel: React.FC<AIResultPanelProps> = ({ results, profession }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Informações copiadas para a área de transferência."
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analysis">
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="analysis">Análise Contextual</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          
          {profession === 'nutritionist' && (
            <TabsTrigger value="nutritionPlan">Plano Alimentar</TabsTrigger>
          )}
          
          <TabsTrigger value="plan">Plano de Tratamento</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="references">Referências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <ContextAnalysisTab 
            analysis={results.contextAnalysis} 
            onCopy={() => copyToClipboard(results.contextAnalysis)} 
          />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <RecommendationsTab 
            recommendations={results.recommendations} 
            onCopy={() => copyToClipboard(results.recommendations)} 
          />
        </TabsContent>
        
        {profession === 'nutritionist' && results.nutritionPlan && (
          <TabsContent value="nutritionPlan">
            <NutritionPlanTab 
              nutritionPlan={results.nutritionPlan}
              onCopy={() => copyToClipboard(
                results.nutritionPlan?.meals.map(meal => 
                  `${meal.name} (${meal.time}):\n${meal.foods.map(f => `- ${f}`).join('\n')}${meal.notes ? `\nObs: ${meal.notes}` : ''}`
                ).join('\n\n')
              )}
            />
          </TabsContent>
        )}
        
        <TabsContent value="resources">
          <ResourcesTab resources={results.resources} />
        </TabsContent>
        
        <TabsContent value="plan">
          <TreatmentPlanTab 
            plan={results.plan}
            onCopy={() => copyToClipboard(
              results.plan.map(p => `Dia ${p.day}:\n${p.activities.map(a => `- ${a}`).join('\n')}`).join('\n\n')
            )}
          />
        </TabsContent>
        
        <TabsContent value="references">
          <ReferencesTab 
            references={results.references || []}
            onCopy={() => copyToClipboard(
              (results.references || []).join('\n\n')
            )}
          />
        </TabsContent>
      </Tabs>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Importante:</strong> Este plano foi gerado por uma inteligência artificial com base em evidências científicas e diretrizes clínicas atuais. 
          Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer tratamento.
        </p>
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" />
            Exportar como PDF
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportação de PDF</DialogTitle>
            <DialogDescription>
              Esta funcionalidade estará disponível em breve. Você poderá exportar análises completas para compartilhar com pacientes e outros profissionais.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button variant="outline" className="mt-4">Entendi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

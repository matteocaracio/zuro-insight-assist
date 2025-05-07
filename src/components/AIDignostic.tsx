
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Book, Copy, ArrowRight } from 'lucide-react';

const AIRecommendation = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | {
    recommendations: string;
    resources: Array<{ title: string; type: string; url: string }>;
    plan: Array<{ day: number; activities: string[] }>;
  }>(null);
  
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    if (input.trim().length < 10) {
      toast({
        title: "Entrada muito curta",
        description: "Por favor, forneça mais detalhes sobre seus sintomas ou objetivos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mocked AI response
      setResults({
        recommendations: "Com base nos sintomas descritos, recomendamos iniciar com fisioterapia focada em mobilidade articular e fortalecimento muscular. Sugiro iniciar com exercícios de baixo impacto 3 vezes por semana, complementados com alongamentos diários.",
        resources: [
          { title: "Guia de Exercícios para Coluna", type: "PDF", url: "#" },
          { title: "Exercícios de Alongamento", type: "Vídeo", url: "#" },
          { title: "Nutrição para Recuperação Muscular", type: "Artigo", url: "#" },
        ],
        plan: [
          { day: 1, activities: ["Avaliação inicial", "Exercícios básicos de mobilidade", "Aplicação de calor local"] },
          { day: 2, activities: ["Descanso ativo", "Alongamentos leves", "Caminhada de 10 minutos"] },
          { day: 3, activities: ["Exercícios de fortalecimento", "Mobilização articular", "Técnicas de respiração"] },
          { day: 7, activities: ["Reavaliação de progresso", "Ajustes no plano de tratamento", "Incremento na intensidade dos exercícios"] },
          { day: 14, activities: ["Avaliação final do ciclo", "Definição de próximos passos", "Orientações para continuidade"] },
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Informações copiadas para a área de transferência.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Diagnóstico e Plano Automatizado por IA</h1>
        <p className="mt-2 text-gray-600">
          Descreva seus sintomas ou objetivos terapêuticos para receber um plano personalizado gerado por nossa Inteligência Artificial.
        </p>
      </div>
      
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>Seus sintomas ou objetivos</CardTitle>
          <CardDescription>
            Quanto mais detalhes você fornecer, mais personalizado será o plano gerado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Tenho sentido dores na região lombar há 3 semanas, principalmente ao me levantar pela manhã. Já tentei alongamentos básicos, mas a dor persiste. Meu objetivo é retornar às atividades normais sem dor e fortalecer a musculatura."
            className="min-h-[150px] zuro-textarea"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGeneratePlan} 
            disabled={loading} 
            className="bg-zuro hover:bg-zuro-dark text-white"
          >
            {loading ? (
              <>
                <div className="animate-pulse-light mr-2 h-4 w-4 rounded-full bg-white"></div>
                Gerando Plano...
              </>
            ) : (
              <>
                Gerar plano com IA
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {results && (
        <div className="space-y-6">
          <Tabs defaultValue="recommendations">
            <TabsList className="mb-4 bg-gray-100">
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
              <TabsTrigger value="resources">Recursos Educativos</TabsTrigger>
              <TabsTrigger value="plan">Plano de Tratamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Recomendações Personalizadas</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.recommendations)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">{results.recommendations}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Educativos Recomendados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.resources.map((resource, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="bg-zuro/10 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-zuro">{resource.type}</p>
                            <Book className="h-4 w-4 text-zuro" />
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        </CardContent>
                        <div className="bg-gray-50 px-4 py-3 border-t">
                          <a 
                            href={resource.url} 
                            className="text-sm text-zuro hover:text-zuro-dark flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Acessar recurso
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plan">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Plano de Tratamento Sugerido</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(
                        results.plan.map(p => `Dia ${p.day}:\n${p.activities.map(a => `- ${a}`).join('\n')}`).join('\n\n')
                      )}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.plan.map((day, i) => (
                      <div key={i} className="relative">
                        <div className="flex items-center mb-2">
                          <div className="bg-zuro text-white rounded-full h-8 w-8 flex items-center justify-center font-medium">
                            {day.day}
                          </div>
                          <h4 className="ml-3 font-medium text-gray-900">
                            {day.day === 1 ? "Primeiro Dia" : 
                             day.day === 7 ? "Primeira Semana" : 
                             day.day === 14 ? "Segunda Semana" : `Dia ${day.day}`}
                          </h4>
                        </div>
                        <div className="ml-4 pl-8 border-l-2 border-dashed border-gray-200">
                          <ul className="space-y-3">
                            {day.activities.map((activity, j) => (
                              <li key={j} className="flex items-center">
                                <div className="w-2 h-2 bg-zuro rounded-full mr-3"></div>
                                <p className="text-gray-700">{activity}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {i < results.plan.length - 1 && (
                          <div className="h-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Importante:</strong> Este plano foi gerado por uma inteligência artificial com base nas informações fornecidas. 
              Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer tratamento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;


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
  Flask, 
  Brain, 
  UserMinus, 
  Medkit 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ProfessionType = 
  | 'physio' 
  | 'nutritionist' 
  | 'psychologist' 
  | 'physician' 
  | 'dentist';

interface NutritionPlan {
  meals: {
    name: string;
    time: string;
    foods: string[];
    notes?: string;
  }[];
}

interface AIResult {
  contextAnalysis: string;
  recommendations: string;
  resources: Array<{
    title: string;
    type: string;
    url: string;
  }>;
  plan: Array<{
    day: number;
    activities: string[];
  }>;
  nutritionPlan?: NutritionPlan;
  references?: string[];
}

const AIRecommendation = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState<ProfessionType>('physio');
  const [results, setResults] = useState<AIResult | null>(null);
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

  const generateMockResponse = (profession: ProfessionType, userInput: string): AIResult => {
    // This would be replaced by actual AI model calls in a real implementation
    switch (profession) {
      case 'nutritionist':
        return {
          contextAnalysis: "De acordo com a descrição, o paciente apresenta sinais de alimentação desregulada com consumo excessivo de carboidratos refinados e alimentos ultraprocessados. Há também relato de rotina agitada que dificulta a preparação de refeições balanceadas.",
          recommendations: "Recomendo uma reestruturação gradual do plano alimentar, com foco em alimentos integrais e preparação prévia de refeições. É importante considerar os horários irregulares do paciente e fornecer opções práticas que possam ser transportadas.",
          resources: [
            { title: "Guia Alimentar para a População Brasileira", type: "PDF", url: "#" },
            { title: "Técnicas de preparo de marmitas saudáveis", type: "Vídeo", url: "#" },
            { title: "Lista de substitutos para alimentos ultraprocessados", type: "Artigo", url: "#" }
          ],
          plan: [
            { day: 1, activities: ["Avaliação nutricional completa", "Registro alimentar de 3 dias", "Orientação inicial"] },
            { day: 7, activities: ["Análise do registro alimentar", "Ajustes no plano alimentar", "Introdução de novas receitas"] },
            { day: 15, activities: ["Avaliação de adaptação", "Ajustes finos nas porções", "Estratégias para alimentação fora de casa"] },
            { day: 30, activities: ["Reavaliação completa", "Análise de exames bioquímicos", "Ajustes no plano baseados em resultados"] }
          ],
          nutritionPlan: {
            meals: [
              {
                name: "Café da manhã",
                time: "7:00 - 8:00",
                foods: ["1 fatia de pão integral", "1 ovo mexido", "1 fruta média", "Chá verde ou café sem açúcar"],
                notes: "Priorizar proteínas no café da manhã para maior saciedade"
              },
              {
                name: "Lanche da manhã",
                time: "10:00 - 10:30",
                foods: ["1 punhado de oleaginosas (castanhas, amêndoas)", "1 fruta pequena"],
                notes: "Pode ser substituído por um iogurte natural com frutas"
              },
              {
                name: "Almoço",
                time: "12:30 - 13:30",
                foods: ["Vegetais folhosos à vontade", "4-5 colh. sopa de arroz integral ou quinoa", "120g proteína magra (frango, peixe)", "1-2 colh. sopa azeite extra virgem"],
                notes: "Método do prato: metade vegetais, 1/4 proteínas, 1/4 carboidratos"
              },
              {
                name: "Lanche da tarde",
                time: "16:00 - 16:30",
                foods: ["Smoothie: 1 fruta + folhas verdes + leite vegetal", "1 fatia de torrada integral"],
                notes: "Opção prática para levar em recipiente térmico"
              },
              {
                name: "Jantar",
                time: "19:30 - 20:30",
                foods: ["Sopa de legumes com proteína", "1 porção pequena de carboidrato complexo", "Chá digestivo"],
                notes: "Refeição leve para melhorar qualidade do sono"
              }
            ]
          },
          references: [
            "Sociedade Brasileira de Alimentação e Nutrição (SBAN) - Diretrizes para uma alimentação saudável, 2023",
            "American Journal of Clinical Nutrition - Efeitos da distribuição proteica ao longo do dia, 2021",
            "Ministério da Saúde - Guia Alimentar para a População Brasileira, 2022"
          ]
        };
        
      case 'psychologist':
        return {
          contextAnalysis: "O paciente apresenta sintomas consistentes com transtorno de ansiedade generalizada, com preocupações excessivas em múltiplos contextos, dificuldade para controlar essas preocupações e sintomas somáticos como tensão muscular e dificuldade para dormir. Os sintomas estão presentes há mais de 6 meses e causam prejuízo significativo no funcionamento social e profissional.",
          recommendations: "Recomendo uma abordagem multipronged incluindo terapia cognitivo-comportamental (TCC) focada em técnicas de enfrentamento, reestruturação cognitiva para identificar e desafiar pensamentos catastróficos, e treinamento em técnicas de relaxamento e mindfulness. É importante estabelecer uma rotina de sono regular e considerar encaminhamento para avaliação psiquiátrica para possível tratamento medicamentoso complementar. O plano terapêutico deve incluir sessões semanais inicialmente, com reavaliação após 8 semanas.",
          resources: [
            { title: "Diário de pensamentos e emoções", type: "PDF", url: "#" },
            { title: "Áudios guiados de relaxamento progressivo", type: "Áudio", url: "#" },
            { title: "Técnicas de respiração diafragmática", type: "Vídeo", url: "#" }
          ],
          plan: [
            { day: 1, activities: ["Avaliação clínica completa", "Estabelecimento de aliança terapêutica", "Psicoeducação sobre ansiedade"] },
            { day: 7, activities: ["Introdução às técnicas de respiração e relaxamento", "Identificação de gatilhos de ansiedade", "Estabelecimento de metas iniciais"] },
            { day: 14, activities: ["Revisão do diário de pensamentos", "Início da reestruturação cognitiva", "Prática guiada de mindfulness"] },
            { day: 28, activities: ["Desenvolvimento de estratégias de enfrentamento", "Exposição gradual a situações ansiogênicas", "Revisão do progresso inicial"] },
            { day: 56, activities: ["Reavaliação completa", "Ajuste do plano terapêutico", "Prevenção de recaídas"] }
          ],
          references: [
            "American Psychological Association - Diretrizes para tratamento de transtornos de ansiedade, 2023",
            "Beck, J. S. (2021). Terapia Cognitivo-Comportamental: Teoria e Prática. 3ª ed.",
            "Barlow, D. H. (2022). Manual clínico dos transtornos psicológicos: Tratamento passo a passo. 6ª ed."
          ]
        };
        
      case 'physician':
        return {
          contextAnalysis: "O paciente apresenta quadro sugestivo de hipertensão arterial estágio 1 (140-159/90-99 mmHg), associada a fatores de risco como sobrepeso, sedentarismo e histórico familiar positivo. Não há evidências de lesão em órgãos-alvo até o momento, mas o risco cardiovascular é moderado segundo o escore de Framingham.",
          recommendations: "Recomendo iniciar com medidas não-farmacológicas intensivas por 3 meses, incluindo dieta DASH com restrição de sódio (<2g/dia), atividade física regular (150 min/semana de atividade moderada), redução do consumo de álcool e cessação do tabagismo se aplicável. Monitorização domiciliar da pressão arterial é essencial. Se após 3 meses não houver resposta adequada, iniciar monoterapia com inibidor da ECA ou bloqueador do canal de cálcio, conforme características individuais do paciente.",
          resources: [
            { title: "Diário de monitorização da pressão arterial", type: "PDF", url: "#" },
            { title: "Orientações sobre dieta DASH", type: "Artigo", url: "#" },
            { title: "Técnica correta de aferição da pressão arterial", type: "Vídeo", url: "#" }
          ],
          plan: [
            { day: 1, activities: ["Avaliação clínica completa", "Solicitação de exames complementares", "Orientações iniciais sobre mudanças no estilo de vida"] },
            { day: 15, activities: ["Avaliação dos exames laboratoriais", "Estratificação de risco cardiovascular", "Ajustes nas recomendações não-farmacológicas"] },
            { day: 30, activities: ["Reavaliação da pressão arterial", "Avaliação da adesão às medidas não-farmacológicas", "Decisão sobre necessidade de tratamento farmacológico"] },
            { day: 90, activities: ["Reavaliação completa", "Ajustes no tratamento", "Solicitação de exames de controle"] }
          ],
          references: [
            "Sociedade Brasileira de Cardiologia - Diretrizes de Hipertensão Arterial, 2023",
            "American Heart Association - Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults, 2022",
            "European Society of Cardiology - ESC/ESH Guidelines for the management of arterial hypertension, 2023"
          ]
        };
        
      case 'dentist':
        return {
          contextAnalysis: "O paciente apresenta quadro de doença periodontal moderada localizada, com bolsas periodontais de 4-5mm nas faces proximais dos molares superiores e inferiores. Há presença de cálculo supragengival generalizado e subgengival localizado. Higiene oral deficiente, com índice de placa de aproximadamente 65% e sangramento à sondagem em 40% dos sítios.",
          recommendations: "Recomendo tratamento periodontal não-cirúrgico inicial, incluindo raspagem e alisamento radicular nas áreas afetadas, associado a orientação intensiva de higiene oral com técnica de Bass modificada, uso de fio dental e escovas interdentais. Após a fase inicial, reavaliação em 45 dias para determinar a necessidade de terapia adicional. Manutenção periodontal a cada 3 meses no primeiro ano é essencial para o controle da doença.",
          resources: [
            { title: "Técnica correta de escovação", type: "Vídeo", url: "#" },
            { title: "Uso adequado do fio dental e escovas interdentais", type: "PDF", url: "#" },
            { title: "Controle químico da placa bacteriana", type: "Artigo", url: "#" }
          ],
          plan: [
            { day: 1, activities: ["Exame clínico e periodontal completo", "Radiografias interproximais e periapicais", "Orientação inicial de higiene oral"] },
            { day: 7, activities: ["Raspagem supragengival", "Polimento coronário", "Reforço das técnicas de higiene oral"] },
            { day: 14, activities: ["Raspagem e alisamento radicular por quadrante", "Aplicação de agente dessensibilizante", "Avaliação da adesão às técnicas de higiene"] },
            { day: 45, activities: ["Reavaliação periodontal", "Procedimentos complementares se necessário", "Planejamento da fase de manutenção"] }
          ],
          references: [
            "American Academy of Periodontology - Classification of Periodontal and Peri-Implant Diseases and Conditions, 2023",
            "Sociedade Brasileira de Periodontologia - Diretrizes para tratamento da doença periodontal, 2022",
            "Journal of Clinical Periodontology - Effectiveness of non-surgical periodontal therapy: A systematic review, 2021"
          ]
        };
        
      default: // physio and fallback
        return {
          contextAnalysis: "Com base nos sintomas descritos, o paciente apresenta um quadro consistente com lombalgia mecânica crônica, com componente miofascial importante e possível relação com encurtamento da cadeia posterior e fraqueza da musculatura estabilizadora do core. Há indicação de alteração postural associada ao comportamento sedentário e ergonomia inadequada no ambiente de trabalho.",
          recommendations: "Recomendo iniciar com fisioterapia focada em mobilidade articular, liberação miofascial e fortalecimento progressivo da musculatura estabilizadora. Exercícios de baixo impacto 3 vezes por semana, complementados com alongamentos diários e orientações ergonômicas são essenciais. É importante seguir uma progressão gradual de carga e intensidade, respeitando os limites de dor do paciente.",
          resources: [
            { title: "Guia de Exercícios para Coluna", type: "PDF", url: "#" },
            { title: "Exercícios de Alongamento da Cadeia Posterior", type: "Vídeo", url: "#" },
            { title: "Orientações Ergonômicas para Trabalho Sentado", type: "Artigo", url: "#" }
          ],
          plan: [
            { day: 1, activities: ["Avaliação física completa", "Exercícios básicos de mobilidade", "Aplicação de terapia manual inicial"] },
            { day: 2, activities: ["Alongamentos específicos", "Técnicas de relaxamento muscular", "Orientações posturais básicas"] },
            { day: 3, activities: ["Exercícios de fortalecimento inicial", "Mobilização articular", "Técnicas de autocuidado"] },
            { day: 7, activities: ["Reavaliação de progresso", "Ajustes no plano de tratamento", "Incremento na intensidade dos exercícios"] },
            { day: 14, activities: ["Avaliação final do ciclo", "Definição de próximos passos", "Plano de manutenção e prevenção"] }
          ],
          references: [
            "American Physical Therapy Association - Clinical Practice Guidelines for Low Back Pain, 2023",
            "Sociedade Brasileira de Fisioterapia - Diretrizes para tratamento da dor lombar crônica, 2022",
            "European Spine Journal - Effectiveness of exercise therapy for chronic low back pain, 2021"
          ]
        };
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Informações copiadas para a área de transferência."
    });
  };

  const handleHistoryDialog = () => {
    const savedDiagnoses = JSON.parse(localStorage.getItem('aiDiagnoses') || '[]');
    if (savedDiagnoses.length > 0) {
      // Could implement a history dialog here
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
      
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>Descreva os sintomas e objetivos</CardTitle>
          <CardDescription>Quanto mais detalhes você fornecer, melhor ficará a análise!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Área profissional</label>
            <Select value={profession} onValueChange={(value: ProfessionType) => setProfession(value)}>
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
            placeholder={
              profession === 'nutritionist' ? 
                "Ex: Paciente de 35 anos, com rotina de trabalho intensa, sem tempo para preparar refeições. Consome fast-food 4x por semana. Objetivo: melhorar qualidade alimentar sem comprometer tempo." : 
              profession === 'psychologist' ?
                "Ex: Paciente de 28 anos apresentando episódios frequentes de ansiedade, com preocupação excessiva sobre vários aspectos da vida, dificuldade para dormir e tensão muscular. Sintomas presentes há 8 meses." :
              profession === 'physician' ?
                "Ex: Paciente de 52 anos, com pressão arterial de 148/94 mmHg em medições repetidas. IMC 28, sedentário, histórico familiar de hipertensão. Sem outras comorbidades conhecidas." :
              profession === 'dentist' ?
                "Ex: Paciente de 42 anos com sangramento gengival durante escovação, sensibilidade ao frio e quente, última visita ao dentista há 3 anos. Escova os dentes 2x ao dia, não usa fio dental." :
                "Ex: Paciente com dor lombar há 3 semanas, principalmente ao se levantar pela manhã. Trabalha 8h por dia sentado. Já tentou alongamentos básicos, mas a dor persiste. Objetivo: retornar às atividades normais e prevenir recorrência."
            } 
            className="min-h-[150px] zuro-textarea" 
          />
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between">
            <Button
              variant="outline"
              onClick={handleHistoryDialog}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Histórico
            </Button>
            
            <Button 
              onClick={handleGeneratePlan} 
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

      {results && (
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
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-zuro" />
                      Análise Contextual
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.contextAnalysis)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">{results.contextAnalysis}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Medkit className="h-5 w-5 text-zuro" />
                      Recomendações Personalizadas
                    </CardTitle>
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
            
            {profession === 'nutritionist' && results.nutritionPlan && (
              <TabsContent value="nutritionPlan">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Flask className="h-5 w-5 text-zuro" />
                        Plano Alimentar
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(
                          results.nutritionPlan?.meals.map(meal => 
                            `${meal.name} (${meal.time}):\n${meal.foods.map(f => `- ${f}`).join('\n')}${meal.notes ? `\nObs: ${meal.notes}` : ''}`
                          ).join('\n\n')
                        )}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Refeição</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Alimentos</TableHead>
                            <TableHead>Observações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.nutritionPlan.meals.map((meal, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{meal.name}</TableCell>
                              <TableCell>{meal.time}</TableCell>
                              <TableCell>
                                <ul className="list-disc pl-4">
                                  {meal.foods.map((food, j) => (
                                    <li key={j}>{food}</li>
                                  ))}
                                </ul>
                              </TableCell>
                              <TableCell>{meal.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookText className="h-5 w-5 text-zuro" />
                    Recursos Educativos Recomendados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.resources.map((resource, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="bg-zuro/10 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-zuro">{resource.type}</p>
                            <BookText className="h-4 w-4 text-zuro" />
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
                    <CardTitle className="flex items-center gap-2">
                      <ChartLine className="h-5 w-5 text-zuro" />
                      Plano de Tratamento Sugerido
                    </CardTitle>
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
                             day.day === 14 ? "Segunda Semana" : 
                             day.day === 30 ? "Um Mês" :
                             day.day === 90 ? "Três Meses" :
                             `Dia ${day.day}`}
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
                        {i < results.plan.length - 1 && <div className="h-6"></div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="references">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-zuro" />
                      Referências Científicas
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(
                        (results.references || []).join('\n\n')
                      )}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-decimal pl-5">
                    {(results.references || []).map((reference, i) => (
                      <li key={i} className="text-gray-700">{reference}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
      )}
    </div>
  );
};

export default AIRecommendation;


import { AITypes } from './types';

export const generateMockResponse = (profession: AITypes.ProfessionType, userInput: string): AITypes.AIResult => {
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

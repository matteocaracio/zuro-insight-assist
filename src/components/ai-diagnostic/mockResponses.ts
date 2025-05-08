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
      
    case 'speech_therapist':
      return {
        contextAnalysis: "O paciente apresenta alterações na fala caracterizadas por distorções nos fonemas sibilantes (/s/, /z/, /ch/), com comprometimento moderado da inteligibilidade em situações comunicativas complexas. Há também queixas de desconforto durante fala prolongada e episódios de rouquidão após uso vocal intenso.",
        recommendations: "Recomendo um programa terapêutico focado na adequação dos pontos articulatórios dos fonemas alterados, associado a técnicas de conscientização e propriocepção dos órgãos fonoarticulatórios. Orientações para higiene vocal e exercícios para fortalecimento da musculatura orofacial são necessários. Sugiro também uma avaliação instrumental da qualidade vocal para descartar possíveis alterações estruturais nas pregas vocais.",
        resources: [
          { title: "Guia de exercícios articulatórios", type: "PDF", url: "#" },
          { title: "Orientações de higiene vocal", type: "Vídeo", url: "#" },
          { title: "Aplicativo de feedback visual para articulação", type: "App", url: "#" }
        ],
        plan: [
          { day: 1, activities: ["Avaliação fonoaudiológica completa", "Anamnese detalhada", "Análise de amostra de fala"] },
          { day: 7, activities: ["Exercícios de propriocepção articulatória", "Técnicas de conscientização dos pontos articulatórios", "Início de terapia miofuncional"] },
          { day: 15, activities: ["Introdução de exercícios para adequação de tensão vocal", "Prática contextualizada dos fonemas-alvo", "Feedback auditivo e visual"] },
          { day: 30, activities: ["Reavaliação da produção articulatória", "Ajustes terapêuticos", "Plano de manutenção e generalização"] }
        ],
        references: [
          "American Speech-Language-Hearing Association - Practice Portal: Speech Sound Disorders, 2023",
          "Sociedade Brasileira de Fonoaudiologia - Diretrizes Clínicas para Distúrbios Articulatórios, 2022",
          "Journal of Speech, Language, and Hearing Research - Efficacy of speech therapy for phonological disorders, 2021"
        ]
      };
      
    case 'occupational_therapist':
      return {
        contextAnalysis: "O paciente apresenta limitações funcionais nas atividades de vida diária (AVDs) resultantes de lesão do plexo braquial, com comprometimento moderado da função do membro superior direito. Há dificuldades na preensão de objetos, coordenação motora fina e atividades que exigem amplitude de movimento completa, impactando sua independência e participação ocupacional.",
        recommendations: "Recomendo um programa de reabilitação com foco na recuperação funcional através de atividades graduadas, adaptações ambientais e uso de tecnologia assistiva conforme necessidade. É importante trabalhar com objetivos centrados no paciente, priorizando as ocupações significativas para ele. Sugiro treinamento específico para AVDs com estratégias adaptativas, exercícios de fortalecimento e técnicas de conservação de energia.",
        resources: [
          { title: "Guia de adaptações para AVDs", type: "PDF", url: "#" },
          { title: "Exercícios para melhora de destreza manual", type: "Vídeo", url: "#" },
          { title: "Catálogo de dispositivos assistivos para alimentação e higiene", type: "Artigo", url: "#" }
        ],
        plan: [
          { day: 1, activities: ["Avaliação ocupacional completa", "Estabelecimento de metas funcionais", "Identificação de barreiras e facilitadores"] },
          { day: 7, activities: ["Introdução às técnicas de controle motor", "Adaptação de utensílios para alimentação", "Orientações para modificações domiciliares"] },
          { day: 15, activities: ["Treinamento em atividades de autocuidado", "Introdução de exercícios ocupacionais terapêuticos", "Avaliação da necessidade de órteses"] },
          { day: 30, activities: ["Reavaliação funcional", "Ajustes nas adaptações", "Progressão para atividades instrumentais de vida diária"] }
        ],
        references: [
          "American Occupational Therapy Association - Occupational Therapy Practice Framework, 2023",
          "Revista Brasileira de Terapia Ocupacional - Intervenções para lesões do plexo braquial, 2022",
          "Canadian Journal of Occupational Therapy - Evidence for activity-based approaches in upper limb rehabilitation, 2021"
        ]
      };
      
    case 'pediatrician':
      return {
        contextAnalysis: "A criança de 4 anos apresenta padrão de crescimento abaixo do esperado (percentil 5 para peso e percentil 10 para altura), com histórico de infecções respiratórias recorrentes (5 episódios nos últimos 12 meses) e dificuldades alimentares caracterizadas por seletividade pronunciada. O desenvolvimento neuropsicomotor está adequado para a idade, porém há relatos de fadiga excessiva durante atividades rotineiras.",
        recommendations: "Recomendo investigação laboratorial incluindo hemograma completo, dosagem de ferritina, vitaminas A, D e B12, função tireoidiana, além de avaliação imunológica básica. É necessária abordagem multidisciplinar com acompanhamento nutricional para manejo da seletividade alimentar e fonoaudiológico para avaliação da deglutição. Sugiro também calendário vacinal completo com inclusão de imunobiológicos especiais como pneumocócica 23-valente e influenza anual.",
        resources: [
          { title: "Guia alimentar para crianças com seletividade", type: "PDF", url: "#" },
          { title: "Técnicas lúdicas para introdução alimentar", type: "Vídeo", url: "#" },
          { title: "Orientações para prevenção de infecções respiratórias", type: "Artigo", url: "#" }
        ],
        plan: [
          { day: 1, activities: ["Avaliação pediátrica completa", "Solicitação de exames", "Orientações iniciais para família"] },
          { day: 10, activities: ["Análise dos resultados laboratoriais", "Elaboração de plano terapêutico", "Encaminhamentos multidisciplinares"] },
          { day: 30, activities: ["Reavaliação antropométrica", "Verificação da adesão às orientações", "Ajustes nas recomendações nutricionais"] },
          { day: 90, activities: ["Avaliação completa do crescimento e desenvolvimento", "Revisão da frequência de infecções", "Planejamento para seguimento trimestral"] }
        ],
        references: [
          "American Academy of Pediatrics - Clinical Practice Guideline for Failure to Thrive, 2023",
          "Sociedade Brasileira de Pediatria - Consenso sobre Infecções Respiratórias Recorrentes, 2022",
          "Journal of Pediatrics - Management of feeding difficulties in preschool children, 2021"
        ]
      };
      
    case 'geriatrician':
      return {
        contextAnalysis: "O paciente idoso de 78 anos apresenta síndrome de fragilidade em estágio inicial, caracterizada por perda de peso não intencional (5% nos últimos 6 meses), diminuição da força de preensão palmar e autorrelato de fadiga. Há também presença de polifarmácia (uso de 7 medicamentos diários), incluindo psicotrópicos, e episódios recorrentes de quedas (2 nos últimos 3 meses), sem fraturas.",
        recommendations: "Recomendo revisão completa da medicação com desprescrição de fármacos potencialmente inapropriados para idosos, seguindo os critérios de Beers. É essencial a implementação de um programa de exercícios multimodal focado em fortalecimento muscular, equilíbrio e capacidade aeróbica, adaptado às condições do paciente. Avaliação nutricional detalhada com suplementação proteica e calórica conforme necessidade. Intervenção ambiental para redução de riscos domiciliares de queda também é prioritária.",
        resources: [
          { title: "Guia de exercícios para idosos frágeis", type: "PDF", url: "#" },
          { title: "Checklist de segurança domiciliar", type: "PDF", url: "#" },
          { title: "Orientações para alimentação enriquecida", type: "Vídeo", url: "#" }
        ],
        plan: [
          { day: 1, activities: ["Avaliação geriátrica ampla", "Revisão farmacoterapêutica", "Aplicação de escalas de fragilidade"] },
          { day: 15, activities: ["Início do programa de exercícios supervisionados", "Orientação nutricional", "Avaliação domiciliar para prevenção de quedas"] },
          { day: 30, activities: ["Reavaliação da força muscular e equilíbrio", "Ajustes na suplementação nutricional", "Monitoramento da adesão às modificações medicamentosas"] },
          { day: 90, activities: ["Avaliação completa da evolução da fragilidade", "Progressão do programa de exercícios", "Revisão da ocorrência de eventos adversos"] }
        ],
        references: [
          "American Geriatrics Society - Updated Beers Criteria for Potentially Inappropriate Medication Use in Older Adults, 2023",
          "Sociedade Brasileira de Geriatria e Gerontologia - Diretrizes em Fragilidade, 2022",
          "Journal of the American Medical Directors Association - Multimodal interventions for frailty prevention, 2021"
        ]
      };
      
    case 'orthopedist':
      return {
        contextAnalysis: "O paciente apresenta quadro de osteoartrite de joelho grau II-III (classificação de Kellgren-Lawrence), com sintomas predominantes em compartimento medial, dor de intensidade moderada (EVA 6/10), rigidez matinal de aproximadamente 20 minutos e limitação funcional para subir escadas e agachar. Exame físico evidencia crepitação, discreto derrame articular e redução de 20° na flexão máxima.",
        recommendations: "Recomendo abordagem multimodal incluindo controle ponderal, fisioterapia focada em fortalecimento muscular (principalmente quadríceps e isquiotibiais) e propriocepção, além de analgesia com acetaminofeno e anti-inflamatórios não esteroidais em períodos curtos conforme necessidade. Em casos de exacerbação da dor, infiltração intra-articular com corticosteroides pode ser considerada, limitada a 3-4 aplicações anuais. Recomendo também uso de órtese de descompressão do compartimento medial para atividades prolongadas.",
        resources: [
          { title: "Programa de exercícios para osteoartrite de joelho", type: "PDF", url: "#" },
          { title: "Técnicas de proteção articular nas atividades diárias", type: "Vídeo", url: "#" },
          { title: "Guia para controle de peso em pacientes com artrose", type: "Artigo", url: "#" }
        ],
        plan: [
          { day: 1, activities: ["Avaliação ortopédica completa", "Radiografias funcionais", "Prescrição inicial de exercícios e medicação"] },
          { day: 15, activities: ["Revisão da resposta à terapia inicial", "Ajustes na prescrição de exercícios", "Avaliação da necessidade de órteses"] },
          { day: 45, activities: ["Reavaliação funcional", "Progressão do programa de exercícios", "Consideração de terapias complementares"] },
          { day: 90, activities: ["Avaliação comparativa com estado inicial", "Planejamento terapêutico de longo prazo", "Discussão sobre prognóstico e opções futuras"] }
        ],
        references: [
          "American Academy of Orthopedic Surgeons - Clinical Practice Guideline on Treatment of Osteoarthritis of the Knee, 2023",
          "Sociedade Brasileira de Ortopedia e Traumatologia - Diretrizes para tratamento da osteoartrite, 2022",
          "Osteoarthritis and Cartilage - OARSI guidelines for non-surgical management of knee osteoarthritis, 2021"
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


export namespace AITypes {
  export type ProfessionType = 
    | 'physio' 
    | 'nutritionist' 
    | 'psychologist' 
    | 'physician' 
    | 'dentist'
    | 'speech_therapist'  // Fonoaudiólogo
    | 'occupational_therapist'  // Terapeuta Ocupacional
    | 'pediatrician'  // Pediatra
    | 'geriatrician'  // Geriatra
    | 'orthopedist';  // Ortopedista

  export interface NutritionPlan {
    meals: {
      name: string;
      time: string;
      foods: string[];
      notes?: string;
    }[];
  }

  export interface AIResult {
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

  export interface DiagnosisHistory {
    id: number;
    date: string;
    profession: ProfessionType;
    input: string;
    result: AIResult;
  }
}

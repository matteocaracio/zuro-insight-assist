
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartLine, Copy } from 'lucide-react';

interface TreatmentPlanTabProps {
  plan: Array<{
    day: number;
    activities: string[];
  }>;
  onCopy: () => void;
}

export const TreatmentPlanTab: React.FC<TreatmentPlanTabProps> = ({ plan, onCopy }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-zuro" />
            Plano de Tratamento Sugerido
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {plan.map((day, i) => (
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
              {i < plan.length - 1 && <div className="h-6"></div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

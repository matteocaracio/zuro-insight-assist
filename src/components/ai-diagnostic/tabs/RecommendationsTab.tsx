
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Copy } from 'lucide-react';

interface RecommendationsTabProps {
  recommendations: string;
  onCopy: () => void;
}

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ recommendations, onCopy }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-zuro" />
            Recomendações Personalizadas
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{recommendations}</p>
      </CardContent>
    </Card>
  );
};

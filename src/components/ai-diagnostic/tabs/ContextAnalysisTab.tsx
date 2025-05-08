
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Copy } from 'lucide-react';

interface ContextAnalysisTabProps {
  analysis: string;
  onCopy: () => void;
}

export const ContextAnalysisTab: React.FC<ContextAnalysisTabProps> = ({ analysis, onCopy }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-zuro" />
            Análise Contextual
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
      </CardContent>
    </Card>
  );
};

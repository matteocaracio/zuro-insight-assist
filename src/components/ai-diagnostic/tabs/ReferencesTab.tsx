
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Copy } from 'lucide-react';

interface ReferencesTabProps {
  references: string[];
  onCopy: () => void;
}

export const ReferencesTab: React.FC<ReferencesTabProps> = ({ references, onCopy }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-zuro" />
            Referências Científicas
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 list-decimal pl-5">
          {references.map((reference, i) => (
            <li key={i} className="text-gray-700">{reference}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

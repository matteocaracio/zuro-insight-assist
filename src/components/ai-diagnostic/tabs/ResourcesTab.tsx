
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, ArrowRight } from 'lucide-react';

interface ResourcesTabProps {
  resources: Array<{
    title: string;
    type: string;
    url: string;
  }>;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ resources }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookText className="h-5 w-5 text-zuro" />
          Recursos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, i) => (
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
  );
};

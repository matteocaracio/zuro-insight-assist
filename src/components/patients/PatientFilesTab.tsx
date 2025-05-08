
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { File } from 'lucide-react';
import { Patient } from './types';

interface PatientFilesTabProps {
  patient: Patient;
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PatientFilesTab: React.FC<PatientFilesTabProps> = ({ patient, handleUploadFile }) => {
  return (
    <TabsContent value="files" className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Adicionar Novo Arquivo</p>
          <div className="flex items-center space-x-2">
            <Input 
              type="file" 
              onChange={handleUploadFile} 
              className="flex-1 border-purple-200" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Formatos aceitos: PDF, DOC, DOCX, JPG, PNG (máx 10MB)
          </p>
        </div>
        
        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Documentos do Paciente</h4>
          {patient.files.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">Nenhum arquivo enviado.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {patient.files.map((file, index) => (
                <Card key={index} className="overflow-hidden border-gray-200">
                  <div className="flex items-center p-3 bg-gray-50 border-b">
                    <File className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-sm font-medium truncate">{file.name}</p>
                  </div>
                  <CardContent className="py-3 px-4 flex items-center justify-between">
                    <p className="text-xs text-gray-500">{file.date}</p>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="text-xs">
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default PatientFilesTab;


import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientInfoTab from './PatientInfoTab';
import PatientNotesTab from './PatientNotesTab';
import PatientFilesTab from './PatientFilesTab';
import PatientAITab from './PatientAITab';
import { Patient } from './types';

interface PatientDetailsProps {
  patient: Patient;
  newNote: string;
  setNewNote: (note: string) => void;
  handleAddNote: () => void;
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aiAnalysis: string | null;
  loadingAI: boolean;
  handleGenerateAIRecommendations: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ 
  patient, 
  newNote, 
  setNewNote, 
  handleAddNote, 
  handleUploadFile, 
  aiAnalysis, 
  loadingAI, 
  handleGenerateAIRecommendations 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg border-purple-100 overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-white border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-purple-800">{patient.name}</CardTitle>
              <CardDescription className="mt-1">
                CPF: {patient.cpf} | Tel: {patient.phone}
              </CardDescription>
            </div>
            <Badge 
              variant={patient.status === "Ativo" ? "default" : "secondary"} 
              className={`${patient.status === "Ativo" ? "bg-green-500" : "bg-gray-500"} shadow-sm`}
            >
              {patient.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full rounded-none bg-gray-50 p-0 h-auto border-b">
              <TabsTrigger value="info" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                Informações
              </TabsTrigger>
              <TabsTrigger value="notes" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                Notas ({patient.notes.length})
              </TabsTrigger>
              <TabsTrigger value="files" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                Arquivos ({patient.files.length})
              </TabsTrigger>
              <TabsTrigger value="ai" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                Análise IA
              </TabsTrigger>
            </TabsList>
            
            <PatientInfoTab patient={patient} />
            <PatientNotesTab 
              patient={patient} 
              newNote={newNote} 
              setNewNote={setNewNote} 
              handleAddNote={handleAddNote} 
            />
            <PatientFilesTab 
              patient={patient} 
              handleUploadFile={handleUploadFile} 
            />
            <PatientAITab 
              patient={patient}
              aiAnalysis={aiAnalysis}
              loadingAI={loadingAI}
              handleGenerateAIRecommendations={handleGenerateAIRecommendations}
            />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;

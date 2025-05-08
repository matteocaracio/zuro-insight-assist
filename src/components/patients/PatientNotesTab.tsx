
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Patient } from './types';

interface PatientNotesTabProps {
  patient: Patient;
  newNote: string;
  setNewNote: (note: string) => void;
  handleAddNote: () => void;
}

const PatientNotesTab: React.FC<PatientNotesTabProps> = ({ 
  patient, 
  newNote, 
  setNewNote, 
  handleAddNote 
}) => {
  return (
    <TabsContent value="notes" className="p-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Adicionar Nova Nota</p>
          </div>
          <Textarea 
            value={newNote} 
            onChange={e => setNewNote(e.target.value)} 
            placeholder="Digite suas observações sobre o paciente..." 
            className="min-h-[120px] border-purple-200 focus:border-purple-400" 
          />
          <Button 
            onClick={handleAddNote} 
            disabled={!newNote.trim()} 
            className="bg-purple-600 hover:bg-purple-700 text-white mt-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Nota
          </Button>
        </div>
        
        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Histórico de Notas</h4>
          {patient.notes.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">Nenhuma nota registrada.</p>
          ) : (
            patient.notes.map((note, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardHeader className="py-3 px-4 border-b bg-gray-100">
                  <p className="text-xs text-gray-500">{note.date}</p>
                </CardHeader>
                <CardContent className="py-3 px-4">
                  <p className="text-sm whitespace-pre-line">{note.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default PatientNotesTab;

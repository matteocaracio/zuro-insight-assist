
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import PatientHeader from './PatientHeader';
import PatientSearch from './PatientSearch';
import PatientDetails from './PatientDetails';
import PatientsList from './PatientsList';
import { Patient } from './types';
import { initialPatients, formatCPF, formatPhone } from './utils';

const PatientDatabase = () => {
  // Use localStorage for persistent storage
  const [patients, setPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });
  const [searchCPF, setSearchCPF] = useState("");
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [patientNotes, setPatientNotes] = useState("");
  const [selectedPatientForNotes, setSelectedPatientForNotes] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: ""
  });
  const { toast } = useToast();

  // Save patients to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Function to check and update patient status
  useEffect(() => {
    const currentDate = new Date();
    const updatedPatients = patients.map(patient => {
      if (patient.status === "Ativo" && patient.lastVisit) {
        const lastVisitDate = new Date(patient.lastVisit);
        const monthsDiff = (currentDate.getFullYear() - lastVisitDate.getFullYear()) * 12 + 
                           (currentDate.getMonth() - lastVisitDate.getMonth());
        if (monthsDiff >= 3 && !patient.nextVisit) {
          return {
            ...patient,
            status: "Inativo"
          };
        }
      }
      return patient;
    });
    setPatients(updatedPatients);
  }, []);

  const handleAddNote = () => {
    if (!currentPatient || !newNote.trim()) return;
    const updatedPatients = patients.map(p => {
      if (p.id === currentPatient.id) {
        return {
          ...p,
          notes: [{
            date: new Date().toISOString().split('T')[0],
            content: newNote
          }, ...p.notes]
        };
      }
      return p;
    });
    setPatients(updatedPatients);
    setCurrentPatient({
      ...currentPatient,
      notes: [{
        date: new Date().toISOString().split('T')[0],
        content: newNote
      }, ...currentPatient.notes]
    });
    setNewNote("");
    toast({
      title: "Nota adicionada",
      description: "Nota adicionada com sucesso ao prontuário do paciente."
    });
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentPatient) return;
    const newFile = {
      name: file.name,
      date: new Date().toISOString().split('T')[0],
      type: file.type
    };
    const updatedPatients = patients.map(p => {
      if (p.id === currentPatient.id) {
        return {
          ...p,
          files: [...p.files, newFile]
        };
      }
      return p;
    });
    setPatients(updatedPatients);
    setCurrentPatient({
      ...currentPatient,
      files: [...currentPatient.files, newFile]
    });
    toast({
      title: "Arquivo enviado",
      description: `${file.name} adicionado ao prontuário do paciente.`
    });

    // Reset file input
    e.target.value = '';
  };

  const handleGenerateAIRecommendations = () => {
    if (!currentPatient) return;
    setLoadingAI(true);

    // Simulate AI processing
    setTimeout(() => {
      const recommendation = `Com base nos dados do paciente ${currentPatient.name} e seu histórico de tratamento, a IA recomenda:

1. Continuar com o protocolo de fortalecimento muscular, com foco especial em estabilizadores do core.

2. Incrementar gradualmente a intensidade dos exercícios de propriocepção.

3. Considerar a introdução de técnicas de liberação miofascial nas áreas de maior tensão.

4. Manter a frequência de 2x por semana, reavaliando em 30 dias.

5. Complementar o tratamento com exercícios domiciliares diários de baixa intensidade.

Observações adicionais: Os exames mostram melhora na condição inflamatória, corroborando com o relato de diminuição da dor pelo paciente. Recomenda-se manter a abordagem atual com os ajustes sugeridos acima.`;
      setAiAnalysis(recommendation);
      setLoadingAI(false);
      toast({
        title: "Análise de IA concluída",
        description: "Recomendações geradas com base nos dados do paciente."
      });
    }, 2000);
  };

  const handleOpenNotes = (patient: Patient) => {
    setSelectedPatientForNotes(patient);
    // Get patient's consultation notes
    const patientData = patients.find(p => p.id === patient.id);
    setPatientNotes(patientData?.consultationNotes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedPatientForNotes) return;
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatientForNotes.id) {
        return {
          ...p,
          consultationNotes: patientNotes
        };
      }
      return p;
    });
    setPatients(updatedPatients);
    toast({
      title: "Notas salvas",
      description: "As notas de consulta foram salvas com sucesso."
    });
  };

  const handleDeletePatient = (patientId: number) => {
    const updatedPatients = patients.filter(p => p.id !== patientId);
    setPatients(updatedPatients);

    // If the deleted patient is the current patient, clear it
    if (currentPatient && currentPatient.id === patientId) {
      setCurrentPatient(null);
    }
    toast({
      title: "Paciente excluído",
      description: "O paciente foi excluído com sucesso."
    });
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.cpf || !newPatient.email || !newPatient.phone) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Check if CPF already exists
    if (patients.some(p => p.cpf === newPatient.cpf)) {
      toast({
        title: "CPF já cadastrado",
        description: "Este CPF já está vinculado a outro paciente.",
        variant: "destructive"
      });
      return;
    }
    const newPatientObj: Patient = {
      id: Math.max(0, ...patients.map(p => p.id)) + 1,
      name: newPatient.name,
      cpf: formatCPF(newPatient.cpf),
      phone: formatPhone(newPatient.phone),
      email: newPatient.email,
      lastVisit: null,
      nextVisit: null,
      status: "Ativo",
      notes: [],
      files: [],
      consultationNotes: ""
    };
    setPatients([...patients, newPatientObj]);

    // Reset form
    setNewPatient({
      name: "",
      cpf: "",
      email: "",
      phone: ""
    });
    toast({
      title: "Paciente cadastrado",
      description: `${newPatient.name} foi adicionado com sucesso.`,
      variant: "default"
    });
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.cpf.includes(searchTerm) || 
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PatientHeader />
      
      <PatientSearch 
        searchCPF={searchCPF} 
        setSearchCPF={setSearchCPF} 
        setCurrentPatient={setCurrentPatient} 
        patients={patients} 
      />
      
      {currentPatient && (
        <PatientDetails 
          patient={currentPatient}
          newNote={newNote}
          setNewNote={setNewNote}
          handleAddNote={handleAddNote}
          handleUploadFile={handleUploadFile}
          aiAnalysis={aiAnalysis}
          loadingAI={loadingAI}
          handleGenerateAIRecommendations={handleGenerateAIRecommendations}
        />
      )}
      
      <PatientsList 
        patients={patients}
        filteredPatients={filteredPatients}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPatient={setCurrentPatient}
        handleDeletePatient={handleDeletePatient}
        newPatient={newPatient}
        setNewPatient={setNewPatient}
        handleAddPatient={handleAddPatient}
        patientNotes={patientNotes}
        setPatientNotes={setPatientNotes}
        handleOpenNotes={handleOpenNotes}
        handleSaveNotes={handleSaveNotes}
        selectedPatientForNotes={selectedPatientForNotes}
      />
    </div>
  );
};

export default PatientDatabase;

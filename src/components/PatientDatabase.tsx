import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, File, Plus, ArrowRight, Copy, Trash2, FileEdit, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define Patient type to avoid TypeScript errors
interface PatientNote {
  date: string;
  content: string;
}
interface PatientFile {
  name: string;
  date: string;
  type: string;
}
interface Patient {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  lastVisit: string | null;
  nextVisit: string | null;
  status: string;
  notes: PatientNote[];
  files: PatientFile[];
  consultationNotes?: string; // Add the missing property
}

// Initial patient data
const initialPatients: Patient[] = [{
  id: 1,
  name: "João Silva",
  cpf: "123.456.789-00",
  phone: "(11) 98765-4321",
  email: "joao.silva@email.com",
  lastVisit: "2023-04-28",
  nextVisit: "2023-05-12",
  status: "Ativo",
  notes: [{
    date: "2023-04-28",
    content: "Paciente relatou melhora significativa na mobilidade após 3 sessões."
  }, {
    date: "2023-03-15",
    content: "Iniciou tratamento para dor lombar crônica. Recomendado exercícios diários."
  }],
  files: [{
    name: "Exame Raio-X.pdf",
    date: "2023-03-10",
    type: "application/pdf"
  }, {
    name: "Avaliação Inicial.pdf",
    date: "2023-03-01",
    type: "application/pdf"
  }],
  consultationNotes: "Paciente precisa manter o uso de compressas de gelo após os exercícios."
}, {
  id: 2,
  name: "Maria Oliveira",
  cpf: "987.654.321-00",
  phone: "(11) 91234-5678",
  email: "maria.oliveira@email.com",
  lastVisit: "2023-05-02",
  nextVisit: "2023-05-16",
  status: "Ativo",
  notes: [{
    date: "2023-05-02",
    content: "Realizados exercícios de fortalecimento. Paciente apresentou evolução na propriocepção."
  }],
  files: [{
    name: "Ressonância Magnética.pdf",
    date: "2023-04-20",
    type: "application/pdf"
  }],
  consultationNotes: ""
}, {
  id: 3,
  name: "Lucas Santos",
  cpf: "456.789.123-00",
  phone: "(11) 95555-9999",
  email: "lucas.santos@email.com",
  lastVisit: "2023-04-18",
  nextVisit: null,
  status: "Inativo",
  notes: [{
    date: "2023-04-18",
    content: "Paciente completou tratamento. Alta médica concedida."
  }],
  files: [],
  consultationNotes: "Reavaliação em 6 meses para monitoramento preventivo."
}];
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
  const {
    toast
  } = useToast();

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
        const monthsDiff = (currentDate.getFullYear() - lastVisitDate.getFullYear()) * 12 + (currentDate.getMonth() - lastVisitDate.getMonth());
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

  // Format CPF input
  const formatCPF = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
  };

  // Format phone input
  const formatPhone = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
  };
  const handleSearchCPF = () => {
    const formattedCPF = formatCPF(searchCPF);
    setSearchCPF(formattedCPF);

    // Search patient by CPF
    const found = patients.find(p => p.cpf === formattedCPF);
    if (found) {
      setCurrentPatient(found);
      toast({
        title: "Paciente encontrado!",
        description: `Dados de ${found.name} carregados com sucesso.`
      });
    } else if (formattedCPF.length >= 14) {
      toast({
        title: "Paciente não encontrado",
        description: "Este CPF não está cadastrado no sistema.",
        variant: "destructive"
      });
    }
  };
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
  const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.cpf.includes(searchTerm) || patient.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 rounded-lg shadow-md text-white mb-6">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <p className="mt-2 opacity-90">
          Gerencie seus pacientes, notas clínicas e documentos.
        </p>
      </div>
      
      {/* Quick Patient Search */}
      <Card className="shadow-lg border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
          <CardTitle className="text-purple-800">Busca Rápida de Paciente</CardTitle>
          <CardDescription>
            Digite o CPF para carregar rapidamente os dados do paciente.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <Input value={searchCPF} onChange={e => setSearchCPF(formatCPF(e.target.value))} placeholder="Ex: 123.456.789-00" className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400" maxLength={14} />
            <Button onClick={handleSearchCPF} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Patient Details Card */}
      {currentPatient && <div className="space-y-6 animate-fade-in">
          <Card className="shadow-lg border-purple-100 overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-white border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-purple-800">{currentPatient.name}</CardTitle>
                  <CardDescription className="mt-1">
                    CPF: {currentPatient.cpf} | Tel: {currentPatient.phone}
                  </CardDescription>
                </div>
                <Badge variant={currentPatient.status === "Ativo" ? "default" : "secondary"} className={`${currentPatient.status === "Ativo" ? "bg-green-500" : "bg-gray-500"} shadow-sm`}>
                  {currentPatient.status}
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
                    Notas ({currentPatient.notes.length})
                  </TabsTrigger>
                  <TabsTrigger value="files" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                    Arquivos ({currentPatient.files.length})
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-none flex-1 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                    Análise IA
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">E-mail</p>
                      <p className="font-medium">{currentPatient.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Telefone</p>
                      <p className="font-medium">{currentPatient.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Última Consulta</p>
                      <p className="font-medium">{currentPatient.lastVisit || "N/A"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Próxima Consulta</p>
                      <p className="font-medium">{currentPatient.nextVisit || "Não agendada"}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">Adicionar Nova Nota</p>
                      </div>
                      <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Digite suas observações sobre o paciente..." className="min-h-[120px] border-purple-200 focus:border-purple-400" />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar Nota
                      </Button>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Histórico de Notas</h4>
                      {currentPatient.notes.length === 0 ? <p className="text-sm text-gray-500 py-4">Nenhuma nota registrada.</p> : currentPatient.notes.map((note, index) => <Card key={index} className="bg-gray-50 border-gray-200">
                            <CardHeader className="py-3 px-4 border-b bg-gray-100">
                              <p className="text-xs text-gray-500">{note.date}</p>
                            </CardHeader>
                            <CardContent className="py-3 px-4">
                              <p className="text-sm whitespace-pre-line">{note.content}</p>
                            </CardContent>
                          </Card>)}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="files" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Adicionar Novo Arquivo</p>
                      <div className="flex items-center space-x-2">
                        <Input type="file" onChange={handleUploadFile} className="flex-1 border-purple-200" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos aceitos: PDF, DOC, DOCX, JPG, PNG (máx 10MB)
                      </p>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Documentos do Paciente</h4>
                      {currentPatient.files.length === 0 ? <p className="text-sm text-gray-500 py-4">Nenhum arquivo enviado.</p> : <div className="grid gap-4 sm:grid-cols-2">
                          {currentPatient.files.map((file, index) => <Card key={index} className="overflow-hidden border-gray-200">
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
                            </Card>)}
                        </div>}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="p-6">
                  <div className="space-y-6">
                    {!aiAnalysis ? <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <div className="mb-4">
                          <FileText className="h-12 w-12 mx-auto text-purple-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Análise de IA</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                          Nossa IA pode analisar os dados e documentos do paciente para gerar recomendações personalizadas.
                        </p>
                        <Button onClick={handleGenerateAIRecommendations} disabled={loadingAI} className="bg-purple-600 hover:bg-purple-700 text-white">
                          {loadingAI ? <>
                              <div className="animate-pulse mr-2 h-4 w-4 rounded-full bg-white"></div>
                              Analisando dados...
                            </> : <>
                              Gerar Recomendações com IA
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>}
                        </Button>
                      </div> : <Card className="border-purple-100">
                        <CardHeader className="border-b bg-gray-50">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-purple-800">Recomendações da IA</CardTitle>
                            <Button variant="outline" size="sm" onClick={() => {
                        navigator.clipboard.writeText(aiAnalysis);
                        toast({
                          title: "Copiado!",
                          description: "Recomendações copiadas para a área de transferência."
                        });
                      }}>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar
                            </Button>
                          </div>
                          <CardDescription>
                            Baseado nos dados e histórico do paciente
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="whitespace-pre-line text-gray-700 bg-white p-4 rounded-md border border-gray-100 shadow-sm">
                            {aiAnalysis}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 text-xs text-gray-500 py-3">
                          <p>Gerado em {new Date().toLocaleString()} · Esta análise automatizada não substitui o julgamento profissional.</p>
                        </CardFooter>
                      </Card>}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>}
      
      {/* Patients List */}
      <Card className="shadow-lg border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-800">Lista de Pacientes</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Paciente</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do paciente para cadastro.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
                    <Input id="name" placeholder="Nome completo do paciente" value={newPatient.name} onChange={e => setNewPatient({
                    ...newPatient,
                    name: e.target.value
                  })} />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="cpf" className="text-sm font-medium">CPF</label>
                    <Input id="cpf" placeholder="000.000.000-00" value={newPatient.cpf} onChange={e => setNewPatient({
                    ...newPatient,
                    cpf: formatCPF(e.target.value)
                  })} maxLength={14} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" value={newPatient.email} onChange={e => setNewPatient({
                      ...newPatient,
                      email: e.target.value
                    })} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                      <Input id="phone" placeholder="(00) 00000-0000" value={newPatient.phone} onChange={e => setNewPatient({
                      ...newPatient,
                      phone: formatPhone(e.target.value)
                    })} maxLength={15} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => {
                  handleAddPatient();
                }}>
                    Cadastrar Paciente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar pacientes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 border-purple-200 focus:border-purple-400" />
            </div>
          </div>
          
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead className="hidden md:table-cell">E-mail</TableHead>
                  <TableHead className="hidden md:table-cell">Tel</TableHead>
                  <TableHead className="hidden md:table-cell">Última Visita</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                      Nenhum paciente encontrado.
                    </TableCell>
                  </TableRow> : filteredPatients.map(patient => <TableRow key={patient.id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.cpf}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.lastVisit || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "Ativo" ? "default" : "secondary"} className={`${patient.status === "Ativo" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Notas de Consulta - {patient.name}</DialogTitle>
                                <DialogDescription>
                                  Anote informações importantes para as próximas consultas.
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea value={selectedPatientForNotes?.id === patient.id ? patientNotes : ""} onChange={e => setPatientNotes(e.target.value)} placeholder="Digite suas anotações aqui..." className="min-h-[200px]" onClick={() => !selectedPatientForNotes && handleOpenNotes(patient)} />
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => {
                            handleOpenNotes(patient);
                            handleSaveNotes();
                          }}>
                                  Salvar Notas
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="ghost" size="sm" onClick={() => setCurrentPatient(patient)}>
                            Ver Detalhes
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="h-8">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Excluir
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o paciente {patient.name}? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeletePatient(patient.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/80">
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-gray-50 py-3">
          <p className="text-sm text-gray-500">
            Mostrando {filteredPatients.length} de {patients.length} pacientes
          </p>
        </CardFooter>
      </Card>
    </div>;
};
export default PatientDatabase;
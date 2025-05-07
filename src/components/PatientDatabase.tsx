import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, File, Plus, ArrowRight, Copy } from 'lucide-react';

// Mock data for demonstration
const mockPatients = [{
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
  }]
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
  }]
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
  files: []
}];
const PatientDatabase = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [searchCPF, setSearchCPF] = useState("");
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const {
    toast
  } = useToast();
  const handleSearchCPF = () => {
    const formattedCPF = searchCPF.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setSearchCPF(formattedCPF);

    // In a real app, this would be an API call
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
    }, 3000);
  };
  const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.cpf.includes(searchTerm) || patient.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Pacientes</h1>
        <p className="mt-2 text-gray-600">
          Gerencie seus pacientes, notas clínicas e documentos.
        </p>
      </div>
      
      {/* CPF Search for quick access */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Buscar Paciente por CPF</CardTitle>
          <CardDescription>
            Digite o CPF para carregar rapidamente os dados do paciente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input value={searchCPF} onChange={e => setSearchCPF(e.target.value)} placeholder="Ex: 123.456.789-00" className="flex-1" maxLength={14} />
            <Button onClick={handleSearchCPF} className="bg-zuro hover:bg-zuro-dark text-white">
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Patient Details Card */}
      {currentPatient && <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{currentPatient.name}</CardTitle>
                  <CardDescription className="mt-1">
                    CPF: {currentPatient.cpf} | Tel: {currentPatient.phone}
                  </CardDescription>
                </div>
                <Badge variant={currentPatient.status === "Ativo" ? "default" : "secondary"} className={currentPatient.status === "Ativo" ? "bg-green-500" : "bg-gray-500"}>
                  {currentPatient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="mb-4 bg-gray-100">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="notes">Notas ({currentPatient.notes.length})</TabsTrigger>
                  <TabsTrigger value="files">Arquivos ({currentPatient.files.length})</TabsTrigger>
                  <TabsTrigger value="ai">Análise IA</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">E-mail</p>
                      <p>{currentPatient.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Telefone</p>
                      <p>{currentPatient.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Última Consulta</p>
                      <p>{currentPatient.lastVisit || "N/A"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Próxima Consulta</p>
                      <p>{currentPatient.nextVisit || "Não agendada"}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">Adicionar Nova Nota</p>
                      </div>
                      <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Digite suas observações sobre o paciente..." className="min-h-[100px]" />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()} className="bg-zuro hover:bg-zuro-dark text-white mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar Nota
                      </Button>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <h4 className="text-sm font-medium text-gray-700">Histórico de Notas</h4>
                      {currentPatient.notes.length === 0 ? <p className="text-sm text-gray-500">Nenhuma nota registrada.</p> : currentPatient.notes.map((note: any, index: number) => <Card key={index} className="bg-gray-50">
                            <CardHeader className="py-3 px-4">
                              <p className="text-xs text-gray-500">{note.date}</p>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <p className="text-sm">{note.content}</p>
                            </CardContent>
                          </Card>)}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="files">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Adicionar Novo Arquivo</p>
                      <div className="flex items-center space-x-2">
                        <Input type="file" onChange={handleUploadFile} className="flex-1" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos aceitos: PDF, DOC, DOCX, JPG, PNG (máx 10MB)
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <h4 className="text-sm font-medium text-gray-700">Documentos do Paciente</h4>
                      {currentPatient.files.length === 0 ? <p className="text-sm text-gray-500">Nenhum arquivo enviado.</p> : <div className="grid gap-3 sm:grid-cols-2">
                          {currentPatient.files.map((file: any, index: number) => <Card key={index} className="overflow-hidden">
                              <div className="flex items-center p-3 bg-gray-50 border-b">
                                <File className="h-4 w-4 mr-2 text-gray-500" />
                                <p className="text-sm font-medium truncate">{file.name}</p>
                              </div>
                              <CardContent className="py-2 px-4 flex items-center justify-between">
                                <p className="text-xs text-gray-500">{file.date}</p>
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm" className="text-xs">
                                    Visualizar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-xs">
                                    Download
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>)}
                        </div>}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai">
                  <div className="space-y-4">
                    {!aiAnalysis ? <div className="text-center py-8">
                        <div className="mb-4">
                          <FileText className="h-12 w-12 mx-auto text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Análise de IA</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                          Nossa IA pode analisar os dados e documentos do paciente para gerar recomendações personalizadas.
                        </p>
                        <Button onClick={handleGenerateAIRecommendations} disabled={loadingAI} className="bg-zuro hover:bg-zuro-dark text-white">
                          {loadingAI ? <>
                              <div className="animate-pulse-light mr-2 h-4 w-4 rounded-full bg-white"></div>
                              Analisando dados...
                            </> : <>
                              Gerar Recomendações com IA
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>}
                        </Button>
                      </div> : <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Recomendações da IA</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(aiAnalysis)}>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar
                            </Button>
                          </div>
                          <CardDescription>
                            Baseado nos dados e histórico do paciente
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="whitespace-pre-line text-gray-700">
                            {aiAnalysis}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 text-xs text-gray-500">
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
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Pacientes</CardTitle>
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
                    <Input id="name" placeholder="Nome completo do paciente" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="cpf" className="text-sm font-medium">CPF</label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button className="bg-zuro hover:bg-zuro-dark text-white">Cadastrar Paciente</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input placeholder="Buscar pacientes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-sm" />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
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
                  </TableRow> : filteredPatients.map(patient => <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.cpf}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.lastVisit || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "Ativo" ? "default" : "secondary"} className={patient.status === "Ativo" ? "bg-green-500" : "bg-gray-500"}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setCurrentPatient(patient)}>
                          Ver Detalhes
                        </Button>
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
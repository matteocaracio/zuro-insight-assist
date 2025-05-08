
// Utility functions for patient data
export const formatCPF = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
};

export const formatPhone = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
};

// Initial patient data
export const initialPatients = [{
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

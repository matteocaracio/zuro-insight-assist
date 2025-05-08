
// Define Patient types
export interface PatientNote {
  date: string;
  content: string;
}

export interface PatientFile {
  name: string;
  date: string;
  type: string;
}

export interface Patient {
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
  consultationNotes?: string;
}

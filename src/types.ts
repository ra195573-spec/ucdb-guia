export type Categoria = 'ensino' | 'saude' | 'esporte' | 'servicos' | 'alimentacao' | 'auditorio' | 'religioso';

export type UserRole = 'aluno' | 'coordenador';

export interface Usuario {
  matricula: string;
  role: UserRole;
  nome: string;
}

export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  localId: string;
  criadoPor: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  category: Categoria;
  lat: number;
  lng: number;
  icon: string;
}

export interface CategoriaConfig {
  bg: string;
  text: string;
  dot: string;
  label: string;
}

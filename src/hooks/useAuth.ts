import { useState, useCallback } from 'react';
import { Usuario, UserRole } from '../types';

const AUTH_KEY = 'ucdb_usuario';

function detectarRole(matricula: string): UserRole | null {
  const lower = matricula.toLowerCase().trim();
  if (lower.startsWith('ra') && lower.length > 2) return 'aluno';
  if (lower.startsWith('rf') && lower.length > 2) return 'coordenador';
  return null;
}

function gerarNome(matricula: string, role: UserRole): string {
  return role === 'aluno'
    ? `Aluno ${matricula.toUpperCase()}`
    : `Coord. ${matricula.toUpperCase()}`;
}

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const salvo = localStorage.getItem(AUTH_KEY);
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  const [erroLogin, setErroLogin] = useState<string | null>(null);

  const login = useCallback((matricula: string) => {
    const role = detectarRole(matricula);
    if (!role) {
      setErroLogin('Matrícula inválida. Use RA para aluno ou RF para coordenador.');
      return false;
    }
    const user: Usuario = {
      matricula: matricula.toLowerCase().trim(),
      role,
      nome: gerarNome(matricula, role),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setUsuario(user);
    setErroLogin(null);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUsuario(null);
  }, []);

  return { usuario, login, logout, erroLogin, setErroLogin };
}

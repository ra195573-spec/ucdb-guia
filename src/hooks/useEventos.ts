import { useState, useCallback } from 'react';
import { Evento } from '../types';

const EVENTOS_KEY = 'ucdb_eventos';

function carregarEventos(): Evento[] {
  try {
    const salvo = localStorage.getItem(EVENTOS_KEY);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

function salvarEventos(eventos: Evento[]) {
  localStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
}

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>(carregarEventos);

  const criarEvento = useCallback((dados: Omit<Evento, 'id'>) => {
    const novo: Evento = { ...dados, id: Date.now().toString() };
    setEventos((prev) => {
      const atualizado = [novo, ...prev];
      salvarEventos(atualizado);
      return atualizado;
    });
  }, []);

  const deletarEvento = useCallback((id: string) => {
    setEventos((prev) => {
      const atualizado = prev.filter((e) => e.id !== id);
      salvarEventos(atualizado);
      return atualizado;
    });
  }, []);

  return { eventos, criarEvento, deletarEvento };
}

import React from 'react';
import { Categoria } from '../types';
import { COR } from '../data/pontos';

interface Props {
  filtroAtivo: Categoria | null;
  onChange: (cat: Categoria | null) => void;
}

const categorias: Categoria[] = ['auditorio', 'religioso', 'ensino', 'saude', 'esporte', 'servicos', 'alimentacao'];

const FiltrosCategorias: React.FC<Props> = ({ filtroAtivo, onChange }) => (
  <div style={{
    display: 'flex', gap: 8,
    padding: '14px 16px 0',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  }}>
    {categorias.map((cat) => {
      const ativo = filtroAtivo === cat;
      const c = COR[cat];
      return (
        <button
          key={cat}
          onClick={() => onChange(ativo ? null : cat)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 14px',
            borderRadius: 100,
            border: `1.5px solid ${ativo ? c.dot : c.bg}`,
            background: ativo ? c.dot : '#fff',
            color: ativo ? '#fff' : c.text,
            fontSize: 12, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
            flexShrink: 0, fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: ativo ? '#fff' : c.dot, flexShrink: 0,
          }} />
          {c.label}
        </button>
      );
    })}
  </div>
);

export default FiltrosCategorias;

import React from 'react';
import { PointOfInterest } from '../types';
import { COR } from '../data/pontos';
import { calcularDistancia, formatarDistancia } from '../utils/geo';

interface Props {
  pontos: PointOfInterest[];
  pontoAtivo: PointOfInterest | null;
  posicaoUsuario: [number, number] | null;
  onSelect: (ponto: PointOfInterest) => void;
}

const ListaPontos: React.FC<Props> = ({ pontos, pontoAtivo, posicaoUsuario, onSelect }) => {
  if (pontos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 16px', color: '#8898b3', fontSize: 14 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
        <p style={{ margin: 0 }}>Nenhum local encontrado.</p>
        <p style={{ margin: 0 }}>Tente outro termo ou categoria.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 16px 100px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {pontos.map((ponto) => {
        const c = COR[ponto.category];
        const ativo = pontoAtivo?.id === ponto.id;
        const distancia = posicaoUsuario
          ? calcularDistancia(posicaoUsuario[0], posicaoUsuario[1], ponto.lat, ponto.lng)
          : null;

        return (
          <div
            key={ponto.id}
            onClick={() => onSelect(ponto)}
            style={{
              background: '#fff',
              borderRadius: 14,
              border: `1.5px solid ${ativo ? '#003B8E' : '#eaeff7'}`,
              padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: c.bg, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {ponto.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 14, fontWeight: 600, color: '#1a2340',
                margin: '0 0 2px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {ponto.name}
              </p>
              <p style={{
                fontSize: 12, color: '#6b7a99', margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {ponto.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <span style={{
                background: c.bg, color: c.text,
                fontSize: 11, fontWeight: 600,
                padding: '3px 10px', borderRadius: 100,
              }}>
                {c.label}
              </span>
              {distancia !== null && (
                <span style={{ fontSize: 12, fontWeight: 600, color: '#003B8E' }}>
                  {formatarDistancia(distancia)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaPontos;

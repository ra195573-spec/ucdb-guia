import React from 'react';
import { IonButton } from '@ionic/react';
import { PointOfInterest } from '../types';
import { COR } from '../data/pontos';
import { calcularDistancia, formatarDistancia, abrirGoogleMaps } from '../utils/geo';

interface Props {
  ponto: PointOfInterest;
  posicaoUsuario: [number, number] | null;
}

const CardPonto: React.FC<Props> = ({ ponto, posicaoUsuario }) => {
  const c = COR[ponto.category];
  const distancia = posicaoUsuario
    ? calcularDistancia(posicaoUsuario[0], posicaoUsuario[1], ponto.lat, ponto.lng)
    : null;

  return (
    <div style={{
      margin: '14px 16px 0',
      background: '#fff',
      borderRadius: 16,
      border: '1.5px solid #dde3ec',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: c.bg, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}>
          {ponto.icon}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1a2340', margin: '0 0 3px' }}>
            {ponto.name}
          </p>
          <p style={{ fontSize: 12, color: '#6b7a99', margin: 0, lineHeight: 1.4 }}>
            {ponto.description}
          </p>
        </div>

        {distancia !== null && (
          <div style={{
            background: '#e8f1ff', color: '#003B8E',
            fontSize: 12, fontWeight: 700,
            padding: '5px 10px', borderRadius: 8,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            📍 {formatarDistancia(distancia)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 16px 14px',
        borderTop: '1px solid #f0f4f8',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          background: c.bg, color: c.text,
          fontSize: 11, fontWeight: 600,
          padding: '3px 10px', borderRadius: 100,
        }}>
          {c.label}
        </span>

        {posicaoUsuario ? (
          <IonButton size="small" fill="outline" onClick={() => abrirGoogleMaps(ponto.lat, ponto.lng, ponto.name)}>
            Abrir no Maps
          </IonButton>
        ) : (
          <span style={{ fontSize: 12, color: '#8898b3' }}>
            💡 Ative o GPS para ver a distância
          </span>
        )}
      </div>
    </div>
  );
};

export default CardPonto;

import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { navigateOutline, trashOutline } from 'ionicons/icons';
import { Evento } from '../types';
import { PONTOS } from '../data/pontos';

interface Props {
  evento: Evento;
  isCoordenador: boolean;
  onIniciarRota: (evento: Evento) => void;
  onDeletar?: (id: string) => void;
}

const CardEvento: React.FC<Props> = ({ evento, isCoordenador, onIniciarRota, onDeletar }) => {
  const local = PONTOS.find((p) => p.id === evento.localId);

  const dataFormatada = new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'short', day: '2-digit', month: 'short',
  });

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1.5px solid #eaeff7',
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      {/* Faixa colorida no topo */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #003B8E, #0055CC)' }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Titulo + badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2340', margin: 0, flex: 1 }}>
            📅 {evento.titulo}
          </h3>
          <span style={{
            background: '#e6f1fb', color: '#003B8E',
            fontSize: 10, fontWeight: 700, padding: '3px 8px',
            borderRadius: 100, whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {dataFormatada}
          </span>
        </div>

        {/* Horário */}
        <p style={{ fontSize: 12, color: '#6b7a99', margin: '6px 0 0' }}>
          🕐 {evento.hora}h
        </p>

        {/* Descrição */}
        {evento.descricao && (
          <p style={{ fontSize: 13, color: '#4a5568', margin: '8px 0 0', lineHeight: 1.5 }}>
            {evento.descricao}
          </p>
        )}

        {/* Local */}
        {local && (
          <div style={{
            marginTop: 10, background: '#f8fafc',
            borderRadius: 10, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>{local.icon}</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#1a2340', margin: 0 }}>{local.name}</p>
              <p style={{ fontSize: 11, color: '#8898b3', margin: 0 }}>{local.description}</p>
            </div>
          </div>
        )}

        {/* Ações */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <IonButton
            size="small"
            onClick={() => onIniciarRota(evento)}
            style={{ '--border-radius': '8px', '--background': '#003B8E', flex: 1 }}
          >
            <IonIcon icon={navigateOutline} slot="start" />
            Ver no mapa
          </IonButton>

          {isCoordenador && onDeletar && (
            <IonButton
              size="small"
              fill="outline"
              color="danger"
              onClick={() => onDeletar(evento.id)}
              style={{ '--border-radius': '8px' }}
            >
              <IonIcon icon={trashOutline} />
            </IonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardEvento;

import React, { useState } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonIcon,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { Evento } from '../types';
import { PONTOS } from '../data/pontos';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (dados: Omit<Evento, 'id'>) => void;
  criadoPor: string;
}

const ModalCriarEvento: React.FC<Props> = ({ isOpen, onClose, onSalvar, criadoPor }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [localId, setLocalId] = useState('');
  const [erro, setErro] = useState('');

  const limpar = () => {
    setTitulo(''); setDescricao('');
    setData(''); setHora('');
    setLocalId(''); setErro('');
  };

  const handleSalvar = () => {
    if (!titulo.trim()) { setErro('Informe o título do evento.'); return; }
    if (!data) { setErro('Informe a data do evento.'); return; }
    if (!hora) { setErro('Informe o horário do evento.'); return; }
    if (!localId) { setErro('Selecione o local do evento.'); return; }

    onSalvar({ titulo: titulo.trim(), descricao: descricao.trim(), data, hora, localId, criadoPor });
    limpar();
    onClose();
  };

  const field = (label: string, children: React.ReactNode) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7a99', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <div style={{ marginTop: 6, border: '1.5px solid #dde3ec', borderRadius: 10, overflow: 'hidden', background: '#f8fafc' }}>
        {children}
      </div>
    </div>
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => { limpar(); onClose(); }}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Novo Evento</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={close} style={{ color: '#fff' }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f0f4f8' }}>
        <div style={{ padding: 20 }}>

          {/* Card form */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {field('Título *',
              <IonInput
                value={titulo}
                onIonInput={(e) => setTitulo(e.detail.value ?? '')}
                placeholder="Ex: Palestra sobre Mercado de Trabalho"
                style={{ '--padding-start': '12px', '--padding-end': '12px' }}
              />
            )}

            {field('Descrição',
              <IonTextarea
                value={descricao}
                onIonInput={(e) => setDescricao(e.detail.value ?? '')}
                placeholder="Detalhes sobre o evento..."
                rows={3}
                style={{ '--padding-start': '12px', '--padding-end': '12px' }}
              />
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                {field('Data *',
                  <IonInput
                    type="date"
                    value={data}
                    onIonInput={(e) => setData(e.detail.value ?? '')}
                    style={{ '--padding-start': '12px', '--padding-end': '12px' }}
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                {field('Horário *',
                  <IonInput
                    type="time"
                    value={hora}
                    onIonInput={(e) => setHora(e.detail.value ?? '')}
                    style={{ '--padding-start': '12px', '--padding-end': '12px' }}
                  />
                )}
              </div>
            </div>

            {field('Local no campus *',
              <IonSelect
                value={localId}
                onIonChange={(e) => setLocalId(e.detail.value)}
                placeholder="Selecione o local"
                style={{ '--padding-start': '12px', '--padding-end': '12px' }}
              >
                {PONTOS.map((p) => (
                  <IonSelectOption key={p.id} value={p.id}>
                    {p.icon} {p.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            )}

            {erro && (
              <p style={{ color: '#e53e3e', fontSize: 12, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                ⚠️ {erro}
              </p>
            )}

            <IonButton
              expand="block"
              onClick={handleSalvar}
              style={{ '--border-radius': '12px', '--background': '#003B8E', marginTop: 8 }}
            >
              ✅ Publicar Evento
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ModalCriarEvento;

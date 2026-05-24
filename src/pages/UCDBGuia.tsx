import React, { useState, useMemo } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent,
  IonSearchbar, IonFab, IonFabButton, IonIcon,
  IonToast, IonButton, IonSegment, IonSegmentButton,
  IonLabel, IonBadge,
} from '@ionic/react';
import { locate, addCircleOutline, logOutOutline, mapOutline, calendarOutline } from 'ionicons/icons';

import { PointOfInterest, Categoria, Evento, Usuario } from '../types';
import { PONTOS } from '../data/pontos';
import { useGeolocalizacao } from '../hooks/useGeolocalizacao';
import { useEventos } from '../hooks/useEventos';

import HeroBanner from '../components/HeroBanner';
import FiltrosCategorias from '../components/FiltrosCategorias';
import MapaLeaflet from '../components/MapaLeaflet';
import CardPonto from '../components/CardPonto';
import ListaPontos from '../components/ListaPontos';
import CardEvento from '../components/CardEvento';
import ModalCriarEvento from '../components/ModalCriarEvento';

interface Props {
  usuario: Usuario;
  onLogout: () => void;
}

type Aba = 'mapa' | 'eventos';

const UCDBGuia: React.FC<Props> = ({ usuario, onLogout }) => {
  const [aba, setAba] = useState<Aba>('mapa');
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Categoria | null>(null);
  const [pontoAtivo, setPontoAtivo] = useState<PointOfInterest | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [modalEvento, setModalEvento] = useState(false);

  const { posicao, rastreando, erro, iniciarRastreamento } = useGeolocalizacao();
  const { eventos, criarEvento, deletarEvento } = useEventos();

  const isCoordenador = usuario.role === 'coordenador';

  const pontosFiltrados = useMemo(() => {
    return PONTOS.filter((p) => {
      const matchBusca = p.name.toLowerCase().includes(busca.toLowerCase());
      const matchCat = !filtro || p.category === filtro;
      return matchBusca && matchCat;
    });
  }, [busca, filtro]);

  const handleGPS = () => {
    iniciarRastreamento();
    setToastMsg(erro ?? '📍 Rastreando sua localização...');
    setShowToast(true);
  };

  const handleIniciarRota = (evento: Evento) => {
    const local = PONTOS.find((p) => p.id === evento.localId);
    if (!local) return;
    setPontoAtivo(local);
    setAba('mapa');
    setToastMsg(`Navegando para: ${local.name}`);
    setShowToast(true);
  };

  const handleCriarEvento = (dados: Omit<Evento, 'id'>) => {
    criarEvento(dados);
    setToastMsg('✅ Evento publicado com sucesso!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px' }}>
            <div style={{
              width: 36, height: 36, background: '#FFD100',
              borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 16, flexShrink: 0,
            }}>
              {isCoordenador ? '👨‍🏫' : '🎒'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                {isCoordenador ? 'Coordenador' : 'Guia do Calouro'}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                {usuario.matricula.toUpperCase()}
              </p>
            </div>
            <IonButton fill="clear" onClick={onLogout} style={{ '--color': 'rgba(255,255,255,0.8)' }}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </div>

          {/* Abas */}
          <IonSegment
            value={aba}
            onIonChange={(e) => setAba(e.detail.value as Aba)}
            style={{ '--background': 'rgba(255,255,255,0.1)', margin: '0 16px 10px' }}
          >
            <IonSegmentButton value="mapa" style={{ '--color': 'rgba(255,255,255,0.7)', '--color-checked': '#fff' }}>
              <IonIcon icon={mapOutline} />
              <IonLabel>Mapa</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="eventos" style={{ '--color': 'rgba(255,255,255,0.7)', '--color-checked': '#fff' }}>
              <IonIcon icon={calendarOutline} />
              <IonLabel>Eventos</IonLabel>
              {eventos.length > 0 && (
                <IonBadge color="warning" style={{ fontSize: 10 }}>{eventos.length}</IonBadge>
              )}
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {/* ── ABA MAPA ── */}
        {aba === 'mapa' && (
          <>
            <HeroBanner />

            <div style={{ padding: '12px 8px 0' }}>
              <IonSearchbar
                value={busca}
                onIonInput={(e: CustomEvent) => setBusca(e.detail.value ?? '')}
                placeholder="Buscar local no campus..."
                style={{ '--border-radius': '12px' }}
              />
            </div>

            <FiltrosCategorias filtroAtivo={filtro} onChange={setFiltro} />

            <MapaLeaflet
              pontoAtivo={pontoAtivo}
              posicaoUsuario={posicao}
              onPontoClick={setPontoAtivo}
            />

            {pontoAtivo && (
              <CardPonto ponto={pontoAtivo} posicaoUsuario={posicao} />
            )}

            <p style={{
              padding: '18px 16px 10px', margin: 0,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8898b3',
            }}>
              Locais do campus
            </p>

            <ListaPontos
              pontos={pontosFiltrados}
              pontoAtivo={pontoAtivo}
              posicaoUsuario={posicao}
              onSelect={setPontoAtivo}
            />
          </>
        )}

        {/* ── ABA EVENTOS ── */}
        {aba === 'eventos' && (
          <div style={{ padding: '20px 16px 100px' }}>

            {/* Header eventos */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a2340', margin: '0 0 2px' }}>
                  📅 Eventos no Campus
                </h2>
                <p style={{ fontSize: 13, color: '#6b7a99', margin: 0 }}>
                  {eventos.length === 0 ? 'Nenhum evento cadastrado' : `${eventos.length} evento${eventos.length > 1 ? 's' : ''}`}
                </p>
              </div>

              {isCoordenador && (
                <IonButton
                  onClick={() => setModalEvento(true)}
                  style={{ '--border-radius': '12px', '--background': '#003B8E' }}
                >
                  <IonIcon icon={addCircleOutline} slot="start" />
                  Novo
                </IonButton>
              )}
            </div>

            {/* Dica coordenador */}
            {isCoordenador && (
              <div style={{
                background: '#f0e8f8', borderRadius: 12,
                padding: '12px 16px', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 20 }}>👨‍🏫</span>
                <p style={{ fontSize: 12, color: '#6A1B9A', margin: 0, lineHeight: 1.4 }}>
                  Como coordenador, você pode criar e excluir eventos. Os alunos verão os eventos e poderão iniciar a rota até o local.
                </p>
              </div>
            )}

            {/* Lista de eventos */}
            {eventos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 16px', color: '#8898b3' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px', color: '#4a5568' }}>
                  Nenhum evento ainda
                </p>
                <p style={{ fontSize: 13, margin: 0 }}>
                  {isCoordenador
                    ? 'Clique em "Novo" para criar o primeiro evento.'
                    : 'Em breve os coordenadores publicarão eventos aqui.'}
                </p>
              </div>
            ) : (
              eventos.map((evento) => (
                <CardEvento
                  key={evento.id}
                  evento={evento}
                  isCoordenador={isCoordenador}
                  onIniciarRota={handleIniciarRota}
                  onDeletar={isCoordenador ? deletarEvento : undefined}
                />
              ))
            )}
          </div>
        )}
      </IonContent>

      {/* FAB GPS — só aparece na aba mapa */}
      {aba === 'mapa' && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color={rastreando ? 'success' : 'primary'} onClick={handleGPS}>
            <IonIcon icon={locate} />
          </IonFabButton>
        </IonFab>
      )}

      <ModalCriarEvento
        isOpen={modalEvento}
        onClose={() => setModalEvento(false)}
        onSalvar={handleCriarEvento}
        criadoPor={usuario.matricula}
      />

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMsg}
        duration={2500}
        color="success"
        position="top"
      />
    </IonPage>
  );
};

export default UCDBGuia;

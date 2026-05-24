import React, { useState } from 'react';
import {
  IonPage, IonContent, IonInput,
  IonButton, IonSpinner,
} from '@ionic/react';

interface Props {
  onLogin: (matricula: string) => boolean;
  erro: string | null;
}

const LoginPage: React.FC<Props> = ({ onLogin, erro }) => {
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!matricula.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // feedback visual
    onLogin(matricula.trim());
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Topo azul */}
        <div style={{
          background: 'linear-gradient(160deg, #003B8E 0%, #0055CC 100%)',
          padding: '60px 32px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* círculos decorativos */}
          <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,209,0,0.1)' }} />
          <div style={{ position:'absolute', bottom:-30, left:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />

          <div style={{
            width: 80, height: 80, background: '#FFD100',
            borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 36, margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}>
            🎓
          </div>
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>
            Guia do Calouro
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>
            Campus UCDB · Campo Grande - MS
          </p>
        </div>

        {/* Card de login */}
        <div style={{ padding: '32px 24px' }}>
          <div style={{
            background: '#fff', borderRadius: 20,
            padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid #eaeff7',
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a2340', margin: '0 0 6px' }}>
              Entrar
            </h2>
            <p style={{ fontSize: 13, color: '#6b7a99', margin: '0 0 24px' }}>
              Use sua matrícula para acessar.
            </p>

            <label style={{ fontSize: 12, fontWeight: 600, color: '#4a5568', letterSpacing: '0.5px' }}>
              MATRÍCULA
            </label>
            <div style={{
              marginTop: 6, marginBottom: 8,
              border: `1.5px solid ${erro ? '#e53e3e' : '#dde3ec'}`,
              borderRadius: 12, overflow: 'hidden',
              background: '#f8fafc',
            }}>
              <IonInput
                value={matricula}
                onIonInput={(e) => setMatricula((e.detail.value ?? '').toLowerCase())}
                onKeyDown={handleKey}
                placeholder="ra123456 ou rf123456"
                style={{ '--padding-start': '14px', '--padding-end': '14px', fontSize: 15 }}
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
              />
            </div>

            {erro && (
              <p style={{ fontSize: 12, color: '#e53e3e', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
                ⚠️ {erro}
              </p>
            )}

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={loading || !matricula.trim()}
              style={{ '--border-radius': '12px', '--background': '#003B8E', marginTop: 8 }}
            >
              {loading ? <IonSpinner name="crescent" /> : 'Entrar'}
            </IonButton>
          </div>

          {/* Dicas */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              background: '#e6f1fb', borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>🎒</span>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1565C0' }}>Sou Aluno</p>
                <p style={{ margin: 0, fontSize: 12, color: '#4a7ab5' }}>Entre com seu RA — ex: ra195573</p>
              </div>
            </div>
            <div style={{
              background: '#f0e8f8', borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>👨‍🏫</span>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#6A1B9A' }}>Sou Coordenador</p>
                <p style={{ margin: 0, fontSize: 12, color: '#8e44ad' }}>Entre com seu RF — ex: rf195573</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;

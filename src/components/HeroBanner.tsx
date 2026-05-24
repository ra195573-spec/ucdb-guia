import React from 'react';

const HeroBanner: React.FC = () => (
  <div style={{
    background: 'linear-gradient(135deg, #003B8E 0%, #0055CC 100%)',
    padding: '20px 20px 28px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Círculo decorativo */}
    <div style={{
      position: 'absolute', right: -30, top: -30,
      width: 160, height: 160,
      background: 'rgba(255,209,0,0.12)',
      borderRadius: '50%',
      pointerEvents: 'none',
    }} />

    <span style={{
      display: 'inline-block',
      background: '#FFD100', color: '#003B8E',
      fontSize: 10, fontWeight: 700,
      letterSpacing: '1.5px', textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 100,
      marginBottom: 10,
    }}>
      ✦ Bem-vindo à UCDB
    </span>

    <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.25 }}>
      Conheça o seu novo campus!
    </h2>
    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
      Encontre salas, serviços, alimentação e muito mais.
    </p>

    <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
      {['28 locais', '7 categorias', 'GPS integrado'].map((t) => (
        <span key={t} style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 100, padding: '5px 14px',
          color: '#fff', fontSize: 12, fontWeight: 600,
        }}>{t}</span>
      ))}
    </div>
  </div>
);

export default HeroBanner;

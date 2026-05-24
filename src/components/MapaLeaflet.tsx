import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { PointOfInterest } from '../types';
import { CAMPUS_CENTER, PONTOS } from '../data/pontos';
import { criarIconePOI, criarIconeUsuario } from '../utils/mapIcons';

interface Props {
  pontoAtivo: PointOfInterest | null;
  posicaoUsuario: [number, number] | null;
  onPontoClick: (ponto: PointOfInterest) => void;
}

const MapaLeaflet: React.FC<Props> = ({ pontoAtivo, posicaoUsuario, onPontoClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const userMarker = useRef<L.Marker | null>(null);
  const routeLine = useRef<L.Polyline | null>(null);

  // Inicializar mapa uma única vez
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: CAMPUS_CENTER,
      zoom: 17,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 20,
    }).addTo(map);

    PONTOS.forEach((ponto) => {
      L.marker([ponto.lat, ponto.lng], { icon: criarIconePOI(ponto) })
        .addTo(map)
        .on('click', () => onPontoClick(ponto));
    });

    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; };
  }, []); // eslint-disable-line

  // Voar para ponto ativo + rota
  useEffect(() => {
    if (!leafletMap.current) return;
    if (routeLine.current) { leafletMap.current.removeLayer(routeLine.current); routeLine.current = null; }

    if (pontoAtivo) {
      leafletMap.current.flyTo([pontoAtivo.lat, pontoAtivo.lng], 18, { duration: 1 });
      if (posicaoUsuario) {
        routeLine.current = L.polyline(
          [posicaoUsuario, [pontoAtivo.lat, pontoAtivo.lng]],
          { color: '#003B8E', weight: 4, dashArray: '8,8', opacity: 0.8 }
        ).addTo(leafletMap.current);
      }
    }
  }, [pontoAtivo, posicaoUsuario]);

  // Atualizar marcador do usuário
  useEffect(() => {
    if (!leafletMap.current || !posicaoUsuario) return;
    if (userMarker.current) {
      userMarker.current.setLatLng(posicaoUsuario);
    } else {
      userMarker.current = L.marker(posicaoUsuario, { icon: criarIconeUsuario() })
        .addTo(leafletMap.current)
        .bindPopup('📍 Você está aqui');
    }
    if (!pontoAtivo) {
      leafletMap.current.flyTo(posicaoUsuario, 17, { duration: 1.5 });
    }
  }, [posicaoUsuario]); // eslint-disable-line

  return (
    <div style={{ margin: '16px 16px 0', borderRadius: 16, overflow: 'hidden', border: '1.5px solid #dde3ec', position: 'relative' }}>
      <span style={{
        position: 'absolute', top: 10, left: 10,
        background: 'rgba(0,59,142,0.9)', color: '#fff',
        fontSize: 11, fontWeight: 600,
        padding: '4px 10px', borderRadius: 100,
        zIndex: 999, pointerEvents: 'none',
      }}>
        🗺️ Campus UCDB
      </span>
      <div ref={mapRef} style={{ width: '100%', height: 380 }} />
    </div>
  );
};

export default MapaLeaflet;

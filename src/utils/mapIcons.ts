import L from 'leaflet';
import { PointOfInterest } from '../types';
import { COR } from '../data/pontos';

export function criarIconePOI(ponto: PointOfInterest): L.DivIcon {
  const cor = COR[ponto.category].dot;
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${cor};border:3px solid white;border-radius:50%;
      width:38px;height:38px;display:flex;align-items:center;
      justify-content:center;font-size:17px;
      box-shadow:0 3px 10px rgba(0,0,0,0.25);cursor:pointer;
    ">${ponto.icon}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}

export function criarIconeUsuario(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:24px;height:24px;">
      <div style="background:#003B8E;border:3px solid white;border-radius:50%;
        width:24px;height:24px;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>
      <div style="position:absolute;top:-10px;left:-10px;
        background:rgba(0,59,142,0.18);border-radius:50%;width:44px;height:44px;"></div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

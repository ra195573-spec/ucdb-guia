import { useState, useCallback, useRef } from 'react';

interface UseGeoReturn {
  posicao: [number, number] | null;
  rastreando: boolean;
  erro: string | null;
  iniciarRastreamento: () => void;
}

export function useGeolocalizacao(): UseGeoReturn {
  const [posicao, setPosicao] = useState<[number, number] | null>(null);
  const [rastreando, setRastreando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const iniciarRastreamento = useCallback(() => {
    if (!navigator.geolocation) {
      setErro('Geolocalização não suportada neste dispositivo.');
      return;
    }
    if (watchIdRef.current !== null) return;

    setRastreando(true);
    setErro(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosicao([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
        setErro('Não foi possível obter sua localização.');
        setRastreando(false);
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  }, []);

  return { posicao, rastreando, erro, iniciarRastreamento };
}

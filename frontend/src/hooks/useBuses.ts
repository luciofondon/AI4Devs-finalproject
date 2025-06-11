import { useState, useEffect } from 'react';
import { Bus } from '../types';
import api from '../services/api';

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        console.log('Iniciando petición a la API...');
        const response = await api.get('/buses');
        console.log('Respuesta de la API:', response.data);
        setBuses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar los buses:', err);
        setError(err instanceof Error ? err : new Error('Error al cargar los buses'));
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  return { buses, loading, error };
}; 
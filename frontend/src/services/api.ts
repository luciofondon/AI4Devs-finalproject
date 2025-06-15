import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error de respuesta:', error.response.data);
      return Promise.reject(new Error(error.response.data.message || 'Error del servidor'));
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('Error de red:', error.request);
      return Promise.reject(new Error('No se pudo conectar con el servidor. Por favor, verifique su conexión.'));
    } else {
      // Algo ocurrió al configurar la petición
      console.error('Error:', error.message);
      return Promise.reject(new Error('Error al procesar la petición'));
    }
  }
);

export default api; 
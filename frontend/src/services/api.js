import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// LOTES CERDOS
export const getLotes = () => api.get('lotes-cerdos/');
export const createLote = (data) => api.post('lotes-cerdos/', data);
export const updateLote = (id, data) => api.patch(`lotes-cerdos/${id}/`, data);

// INVENTARIO / CONSUMOS
export const getProductos = () => api.get('productos/');
export const getConsumos = () => api.get('consumos-alimento/');
export const createConsumo = (data) => api.post('consumos-alimento/', data);

// VENTAS
export const getVentas = () => api.get('ventas/');
export const createVenta = (data) => api.post('ventas/', data);

// OTROS
export const getCultivos = () => api.get('cultivos/');
export const getTransacciones = () => api.get('transacciones/');

export default api;
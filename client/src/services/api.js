import axios from 'axios';

// Use relative URL so requests go through Vite proxy → no CORS issues
const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Auth APIs =====
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  toggleWishlist: (data) => api.post('/auth/wishlist', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
};

// ===== Product APIs =====
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories/list'),
};

// ===== Cart APIs =====
export const cartAPI = {
  get: (userId) => api.get(`/cart/${userId}`),
  add: (data) => api.post('/cart', data),
  update: (data) => api.put('/cart', data),
  remove: (productId, params) => api.delete(`/cart/${productId}`, { params }),
  clear: () => api.delete('/cart'),
};

// ===== Order APIs =====
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
};

// ===== Chat APIs =====
export const chatAPI = {
  sendMessage: (data) => api.post('/chat', data),
  getRecommendations: (params) => api.get('/chat/recommendations', { params }),
  updateContext: (data) => api.post('/chat/context', data),
};

export default api;

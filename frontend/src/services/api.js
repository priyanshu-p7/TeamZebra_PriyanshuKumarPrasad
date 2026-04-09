import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('eventify_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Events API
export const getEvents = (params) => API.get('/events', { params });
export const getEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (formData) =>
  API.post('/events/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateEvent = (id, formData) =>
  API.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Bookings API
export const bookTicket = (data) => API.post('/bookings/book', data);
export const getMyBookings = () => API.get('/bookings/my');

// QR API
export const verifyQR = (data) => API.post('/qr/verify', data);

// Analytics API
export const getEventAnalytics = (eventId) => API.get(`/events/${eventId}/analytics`);

export default API;

// src/services/ticketmasterApi.js
import axios from 'axios';

// Access frontend environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const ticketmasterApi = axios.create({
  baseURL: `${BACKEND_URL}/api/ticketmaster`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
ticketmasterApi.interceptors.request.use(
  (config) => {
    console.log('Making request to:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export const searchEvents = async (params) => {
  try {
    const response = await ticketmasterApi.get('/events', {
      params: {
        ...params,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

export const getEventDetails = async (eventId) => {
  try {
    const response = await ticketmasterApi.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export default ticketmasterApi;

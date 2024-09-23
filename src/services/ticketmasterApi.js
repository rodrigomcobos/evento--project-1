// src/services/ticketmasterApi.js
import axios from 'axios';

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const ticketmasterApi = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api/ticketmaster`,
});

export const searchEvents = async (params) => {
  try {
    const response = await ticketmasterApi.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error(
      'Error searching Ticketmaster events:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getEventDetails = async (eventId) => {
  try {
    const response = await ticketmasterApi.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Ticketmaster event details:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default ticketmasterApi;

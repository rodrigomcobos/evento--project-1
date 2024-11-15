import axios from 'axios';

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const ticketmasterApi = axios.create({
  // Use the backend URL as the base URL
  // for all requests to the Ticketmaster API
  baseURL: `${BACKEND_BASE_URL}/api/ticketmaster`,
});

// Search for events on Ticketmaster
// using the supplied parameters
export const searchEvents = async (params) => {
  try {
    const response = await ticketmasterApi.get('/events', { params });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error and rethrow it
    console.error(
      'Error searching Ticketmaster events:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Fetch event details from Ticketmaster
// using the supplied event ID
export const getEventDetails = async (eventId) => {
  try {
    const response = await ticketmasterApi.get(`/events/${eventId}`);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error and rethrow it
    console.error(
      'Error fetching Ticketmaster event details:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default ticketmasterApi;

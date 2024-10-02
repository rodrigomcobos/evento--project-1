import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

// Define an async thunk for fetching upcoming events (READ)
export const fetchUpcomingEvents = createAsyncThunk(
  'bookings/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/bookings/upcoming');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch upcoming events'
      );
    }
  }
);

// Define an async thunk for fetching past events (READ)
export const fetchPastEvents = createAsyncThunk(
  'bookings/fetchPast',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/bookings/past');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch past events'
      );
    }
  }
);

// Create a slice for the booking state (READ)
const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    upcomingEvents: [],
    pastEvents: [],
    loading: false,
    error: null,
  },
  // Define async actions for fetching upcoming and past events
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        // Use Set to ensure unique events
        const uniqueEvents = Array.from(
          new Set(action.payload.map(JSON.stringify))
        ).map(JSON.parse);
        state.upcomingEvents = uniqueEvents;
        state.loading = false;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPastEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        // Use Set to ensure unique events
        const uniqueEvents = Array.from(
          new Set(action.payload.map(JSON.stringify))
        ).map(JSON.parse);
        state.pastEvents = uniqueEvents;
        state.loading = false;
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

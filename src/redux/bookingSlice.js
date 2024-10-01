import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

export const fetchUpcomingEvents = createAsyncThunk(
  'bookings/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/bookings/upcoming');
      // console.log('Fetched upcoming events:', response.data);
      return response.data;
    } catch (error) {
      // console.error('Error fetching upcoming events:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch upcoming events'
      );
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    upcomingEvents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEvents = action.payload.reduce((acc, current) => {
          const x = acc.find((item) => item.event_id === current.event_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        state.loading = false;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

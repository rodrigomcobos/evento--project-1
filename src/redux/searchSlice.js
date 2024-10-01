import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // console.log('Performing search for:', searchTerm);
      const response = await axios.get(
        `http://localhost:5001/api/ticketmaster/events`,
        {
          params: { keyword: searchTerm },
        }
      );
      // console.log('Search response:', response.data);
      return response.data._embedded?.events || [];
    } catch (error) {
      // console.error('Search error:', error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          'An unknown error occurred'
      );
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred during the search';
        // console.error('Search rejected:', action.payload);
      });
  },
});

export const searchReducer = searchSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

// Define an async thunk for submitting a review (READ)
export const submitReview = createAsyncThunk(
  'review/submit',
  async (reviewData, { rejectWithValue }) => {
    try {
      // console.log('Submitting review data:', reviewData);
      const response = await api.post('/api/reviews', reviewData);
      return response.data;
    } catch (error) {
      // console.error(
      //   'Error submitting review:',
      //   error.response?.data || error.message
      // );
      return rejectWithValue(error.response?.data || 'Failed to submit review');
    }
  }
);

// Define an async thunk for editing a review (READ)
export const editReview = createAsyncThunk(
  'review/editReview',
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to edit review'
      );
    }
  }
);

// Define an async thunk for deleting a review (READ)
export const deleteReview = createAsyncThunk(
  'review/delete',
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/reviews/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete review'
      );
    }
  }
);

// Define an async thunk for fetching user reviews (READ)
export const fetchUserReviews = createAsyncThunk(
  'review/fetchUserReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/reviews/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user reviews'
      );
    }
  }
);

// Define an async thunk for fetching event reviews (READ)
export const fetchEventReviews = createAsyncThunk(
  'review/fetchEventReviews',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/reviews/event/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch event reviews'
      );
    }
  }
);

// Create a slice for the review state
const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(editReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default reviewSlice.reducer;

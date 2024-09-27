import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an instance of axios with the base URL and withCredentials set to true
const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

// Define an async thunk for signing in a user
export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      // Make a POST request to the /api/users/signin endpoint with the credentials
      const response = await api.post('/api/users/signin', credentials);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, return a rejected promise with the error message
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during sign in'
      );
    }
  }
);

// Define an async thunk for signing up a user
export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      // Make a POST request to the /api/users/signup endpoint with the user data
      const response = await api.post('/api/users/signup', userData);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, return a rejected promise with the error message
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during sign up'
      );
    }
  }
);

// Define an async thunk for signing out a user
export const signOut = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      // Make a POST request to the /api/users/signout endpoint
      const response = await api.post('/api/users/signout');
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, return a rejected promise with the error message
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during sign out'
      );
    }
  }
);

// Define an async thunk for getting the current user's profile
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Make a GET request to the /api/users/profile endpoint
      const response = await api.get('/api/users/profile');
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, return a rejected promise with the error message
      return rejectWithValue();
      // If the user is not signed in, show a message indicating that
      // I keep this error off so it won't show up in the console
      // error.response?.data?.message || 'Failed to fetch user profile'
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/users/profile', userData);
      console.log('Profile update response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'An error occurred while updating profile'
      );
    }
  }
);

// Create a slice for the user state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      // Clear any error messages
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle the loading and error states for each of the async thunks
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = { ...state.currentUser, ...action.payload };
        console.log('Updated user in Redux store:', state.currentUser);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

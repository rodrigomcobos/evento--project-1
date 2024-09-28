import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { searchReducer } from './searchSlice';
import reviewReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    review: reviewReducer,
  },
});

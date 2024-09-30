import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { searchReducer } from './searchSlice';
import reviewReducer from './reviewSlice';
import bookingReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    review: reviewReducer,
    bookings: bookingReducer,
  },
});

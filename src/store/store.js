import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import photoReducer from './photoSlice';
import libraryReducer from './librarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photoReducer,
    library: libraryReducer,
  },
}); 
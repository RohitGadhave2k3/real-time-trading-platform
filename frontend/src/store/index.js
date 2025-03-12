import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cryptoReducer from './slices/cryptoSlice';
import portfolioReducer from './slices/portfolioSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    crypto: cryptoReducer,
    portfolio: portfolioReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 
import { configureStore } from '@reduxjs/toolkit';
import { submissionsApi } from './services/api';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer, 
    [submissionsApi.reducerPath]: submissionsApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(submissionsApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
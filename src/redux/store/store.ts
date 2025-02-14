import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/auth-slice';
import habitsSlice from '../reducers/habits-slice';
import progressSlice from '../reducers/progress-slice';

export const store = configureStore({
  reducer: { auth: authSlice, habits: habitsSlice, progress: progressSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/auth-slice';
import habitsSlice from '../reducers/habits-slice';
import visibilitySlice from '../reducers/visibility-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    habits: habitsSlice,
    visibility: visibilitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

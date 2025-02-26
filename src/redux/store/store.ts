import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/auth-slice';
import habitsSlice from '../reducers/habits-slice';
import visibilitySlice from '../reducers/modal-slice';
import calendarSlice from '../reducers/calendar-slice';
import updateSlice from '../reducers/update-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    habits: habitsSlice,
    visibility: visibilitySlice,
    calendar: calendarSlice,
    update: updateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

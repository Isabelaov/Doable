import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit } from '../../../core/domain/entities/habit.entity';

const initialState: { habits: Habit[] } = {
  habits: [],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    },
  },
});

export const { load } = habitsSlice.actions;
export default habitsSlice.reducer;

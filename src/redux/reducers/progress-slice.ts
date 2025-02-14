import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Progress } from '../../../core/domain/entities/progress.entity';

const initialState: { progress: Progress[] } = {
  progress: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Progress[]>) => {
      state.progress = action.payload;
    },
  },
});

export const { load } = progressSlice.actions;
export default progressSlice.reducer;

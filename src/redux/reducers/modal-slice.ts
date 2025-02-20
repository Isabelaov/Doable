import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { habitId: number | undefined; visible: boolean } = {
  habitId: undefined,
  visible: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | undefined>) => {
      state.habitId = action.payload ?? undefined;
      state.visible = true;
    },
    close: state => {
      state.visible = false;
      state.habitId = undefined;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;

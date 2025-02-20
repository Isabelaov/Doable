import { createSlice } from '@reduxjs/toolkit';

const initialState: { visible: boolean } = {
  visible: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    openCalendar: state => {
      state.visible = true;
    },
    closeCalendar: state => {
      state.visible = false;
    },
  },
});

export const { openCalendar, closeCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;

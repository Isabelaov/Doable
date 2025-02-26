import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../components';

const initialState: { formData: FormValues | undefined } = {
  formData: undefined,
};

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    sendData: (state, action: PayloadAction<FormValues>) => {
      state.formData = action.payload;
    },
    deleteData: state => {
      state.formData = undefined;
    },
  },
});

export const { sendData, deleteData } = updateSlice.actions;
export default updateSlice.reducer;

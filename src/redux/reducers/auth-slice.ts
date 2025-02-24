import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../core/domain/entities/user.entity';

const initialState: { isAuthenticated: boolean; user: User | undefined } = {
  isAuthenticated: false,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

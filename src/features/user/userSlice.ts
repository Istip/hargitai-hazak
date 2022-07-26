import { createSlice } from '@reduxjs/toolkit';

// TODO: define User interface

interface User {
  readonly name: string;
  readonly uid: string;
  readonly email: string;
  readonly displayName: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Selector
export const selectUser = (state: UserState) => state.user;

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

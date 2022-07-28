import { createSlice } from '@reduxjs/toolkit';

// TODO: define User interface

export interface User {
  readonly uid: string;
  displayName?: string;
  photoURL?: string;
  email: string;
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Selector
export const selectUser = (state: UserState) => state.user;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

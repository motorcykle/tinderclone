import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout, login } = userSlice.actions;
export const selectUser = (state) => state.user.user;


export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.data = null;
    },
  },
});

export const { logout, login, setData } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserData = (state) => state.user.data;


export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileUID: ``,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProfileUID: (state, action) => {
      state.profileUID = action.payload;
    },
    removeProfileUID: (state) => {
      state.profileUID = null;
    },
  },
});

export const { addProfileUID, removeProfileUID } = appSlice.actions;
export const selectProfileUID = (state) => state.app.profileUID;


export default appSlice.reducer;

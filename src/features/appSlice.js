import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileUID: ``,
  selectedChat: null
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
    addSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    removeSelectedChat: (state) => {
      state.selectedChat = null;
    },
  },
});

export const { addProfileUID, removeProfileUID, addSelectedChat, removeSelectedChat } = appSlice.actions;
export const selectProfileUID = (state) => state.app.profileUID;
export const selectSelectedChat = (state) => state.app.selectedChat;


export default appSlice.reducer;

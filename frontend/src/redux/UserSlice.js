import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: {}, // Boş bir obje olarak başlatın
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = {}; // Boş bir obje olarak ayarlayın
    },
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;

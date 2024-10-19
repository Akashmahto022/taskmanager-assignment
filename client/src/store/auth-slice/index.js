import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: initialUser,
  isAuthenticated: initialUser !== null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../constants";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      localStorage.setItem(TOKEN_NAME, "FAKE-TOKEN");
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem(TOKEN_NAME);
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

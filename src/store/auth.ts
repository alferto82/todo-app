import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../constants";
import { AuthStoreType } from "../types";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state: AuthStoreType) {
      localStorage.setItem(TOKEN_NAME, "FAKE-TOKEN");
      state.isAuthenticated = true;
    },
    logout(state: AuthStoreType) {
      localStorage.removeItem(TOKEN_NAME);
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

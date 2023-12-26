import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../constants";
import { AuthStoreType } from "../types";
import { removeLocalStorage, saveLocalStorage } from "../utils/localStorageUtil";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state: AuthStoreType) {
      saveLocalStorage(TOKEN_NAME, "FAKE-TOKEN");
      state.isAuthenticated = true;
    },
    logout(state: AuthStoreType) {
      removeLocalStorage(TOKEN_NAME)
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

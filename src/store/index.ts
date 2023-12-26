import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./task";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;

import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// As a basic setup, import your same slice reducers
import taskReducer from "../store/task";
import userReducer from "../store/auth";
import { RootState } from "../store";
import { MemoryRouter } from "react-router";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: RootState;
  store?: EnhancedStore<RootState>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = { task: [], auth: { isAuthenticated: true } },
    store = configureStore({
      reducer: {
        task: taskReducer,
        auth: userReducer,
      },
      preloadedState: preloadedState as RootState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>{children} </MemoryRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

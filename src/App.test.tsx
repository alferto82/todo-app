import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./utils/testing-utils";
import { Provider } from "react-redux";
import Logout from "./components/Auth/Logout";




describe("App component", () => {
  it("renders App correctly", () => {
    renderWithProviders(<Logout />);
  });
})


import Logout from "./Logout";
import { renderWithProviders } from "../../utils/testing-utils";
import { fireEvent, screen } from "@testing-library/react";

describe("Testing Logout", () => {
  it("Should render correctly", () => {
    renderWithProviders(<Logout />, {
      preloadedState: { task: [], auth: { isAuthenticated: true } },
    });

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("Should render and click correctly", () => {
    renderWithProviders(<Logout />, {
      preloadedState: { task: [], auth: { isAuthenticated: true } },
    });

    expect(screen.getByText("Logout")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("should render correctly without authentication", () => {
    renderWithProviders(<Logout />, {
      preloadedState: { task: [], auth: { isAuthenticated: false } },
    });

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});

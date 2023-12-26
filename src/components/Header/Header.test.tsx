import { renderWithProviders } from "../../utils/testing-utils";
import { screen } from "@testing-library/react";
import Header from "./Header";

describe("Testing Header", () => {
  it("Should render correctly", () => {
    renderWithProviders(<Header />, {
      preloadedState: { task: [], auth: { isAuthenticated: false } },
    });

    const header = screen.getByRole("heading");
    expect(header.textContent).toBe("Sparta");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("Should render correctly with authentication", () => {
    renderWithProviders(<Header />, {
      preloadedState: { task: [], auth: { isAuthenticated: true } },
    });

    const header = screen.getByRole("heading");
    expect(header.textContent).toBe("Sparta");
    expect(screen.getByRole("button")).not.toBeNull();
  });
});

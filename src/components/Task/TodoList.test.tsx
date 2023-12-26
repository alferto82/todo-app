import { renderWithProviders } from "../../utils/testing-utils";
import { fireEvent, screen } from "@testing-library/react";
import TodoList from "./TodoList";

describe("Testing TestList", () => {
  it("Should render correctly with empty list", () => {
    renderWithProviders(<TodoList />, {
      preloadedState: { task: [], auth: { isAuthenticated: false } },
    });

    expect(screen.getByText("LIST IS EMPTY")).not.toBeNull();
  });

  it("Should render correctly with some elements", () => {
    const tasks = [
      { id: "1", title: "title", check: false },
      { id: "2", title: "title2", check: false },
    ];

    renderWithProviders(<TodoList />, {
      preloadedState: { task: [...tasks], auth: { isAuthenticated: false } },
    });

    expect(screen.queryByText("LIST IS EMPTY")).toBeNull();

    expect(screen.getByRole("list")).not.toBeNull();

    expect(screen.getAllByTestId("todoItem").length).toBe(2);
  });

  it("Clear all should work", () => {
    const tasks = [
      { id: "1", title: "title", check: false },
      { id: "2", title: "title2", check: false },
    ];

    const { store } = renderWithProviders(<TodoList />, {
      preloadedState: { task: [...tasks], auth: { isAuthenticated: false } },
    });

    expect(store.getState().task.length).toBe(2);
    const clearBtn = screen.getByText("Clear all");
    fireEvent.click(clearBtn);

    expect(store.getState().task.length).toBe(0);
  });
});

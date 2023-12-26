import { renderWithProviders } from "../../utils/testing-utils";
import { fireEvent, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Task } from "../../types";

describe("Testing TodoItem", () => {
  const cases = [
    { id: "1", title: "title", check: false },
    { id: "2", title: "title2", check: true },
  ];

  test.each(cases)(
    "given %p as task, should render correctly",
    (task: Task) => {
      renderWithProviders(<TodoItem item={task} />);

      expect(screen.getByText(task.title).textContent).not.toBeNull();
      const check = screen.getByRole("checkbox") as HTMLInputElement;
      expect(check.checked).toBe(task.check);

      const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
      expect(buttons.length).toBe(2);

      expect(buttons[0].disabled).toBe(false);
      expect(buttons[1].disabled).toBe(task.check);
    }
  );

  it("Should be removed from state when remove is clicked", () => {
    const task = { id: "1", title: "title", check: false };
    const { store } = renderWithProviders(<TodoItem item={task} />, {
      preloadedState: { task: [task], auth: { isAuthenticated: true } },
    });

    expect(store.getState().task.length).toBe(1);

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
    fireEvent.click(buttons[0]);

    expect(store.getState().task.length).toBe(0);
  });

  it("Should change task value when editing", () => {
    const task = { id: "1", title: "title", check: false };
    const { store } = renderWithProviders(<TodoItem item={task} />, {
      preloadedState: { task: [task], auth: { isAuthenticated: true } },
    });

    const buttonDelete = screen.getByTestId("DeleteIcon") as HTMLButtonElement;
    expect(buttonDelete).not.toBeNull();
    const buttonEdit = screen.getByTestId("EditIcon") as HTMLButtonElement;
    expect(buttonEdit).not.toBeNull();

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
    fireEvent.click(buttons[1]);

    const buttonDone = screen.getByTestId("DoneIcon") as HTMLButtonElement;
    expect(buttonDone).not.toBeNull();
    const buttonCancel = screen.getByTestId("CancelIcon") as HTMLButtonElement;
    expect(buttonCancel).not.toBeNull();

    const input = screen.queryByDisplayValue(task.title) as HTMLInputElement;
    expect(input.value).toBe(task.title);
    fireEvent.change(input, { target: { value: "New title" } });
    expect(input.value).toBe("New title");

    fireEvent.click(buttonDone);
    expect(store.getState().task[0].title).toBe("New title");
  });

  it("Should not change task title value when cancel editing", () => {
    const task = { id: "1", title: "Old title", check: false };
    const { store } = renderWithProviders(<TodoItem item={task} />, {
      preloadedState: { task: [task], auth: { isAuthenticated: true } },
    });

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
    fireEvent.click(buttons[1]);

    const buttonCancel = screen.getByTestId("CancelIcon") as HTMLButtonElement;
    expect(buttonCancel).not.toBeNull();

    const input = screen.queryByDisplayValue(task.title) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New title" } });
    expect(input.value).toBe("New title");

    fireEvent.click(buttonCancel);
    expect(store.getState().task[0].title).toBe("Old title");
  });
});

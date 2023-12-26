import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";
import { saveLocalStorage } from "../utils/localStorageUtil";
import { TASK_LIST } from "../constants";

const initialTasksState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    addTask: (state: Task[], action: PayloadAction<Task>) => {
      const newTask: Task = {
        id: new Date().getTime().toString(),
        title: action.payload.title,
        check: action.payload.check,
      };
      newTask.check ? state.push(newTask) : state.unshift(newTask);
      saveLocalStorage(TASK_LIST, state);
    },

    //Remove item
    removeTask: (state: Task[], action: PayloadAction<{ id: string }>) => {
      const list = state.filter((item) => item.id !== action.payload.id);
      saveLocalStorage(TASK_LIST, list);
      return list;
    },

    //Update item
    updateTask: (state: Task[], action: PayloadAction<Task>) => {
      const indexItem = state.find(
        (item: Task) => item.id === action.payload.id
      );
      if (indexItem) {
        indexItem.title = action.payload.title;
      }
      saveLocalStorage(TASK_LIST, state);
    },

    //Toggle check
    toggleCheck: (state: Task[], action: PayloadAction<{ id: string }>) => {
      const indexItem = state.find(
        (item: Task) => item.id === action.payload.id
      );
      if (indexItem) {
        indexItem.check = !indexItem.check;
        state.splice(state.indexOf(indexItem), 1);
        indexItem.check ? state.push(indexItem) : state.unshift(indexItem);
      }
      saveLocalStorage(TASK_LIST, state);
    },

    clearAll: () => {
      saveLocalStorage(TASK_LIST, []);
      return [];
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;

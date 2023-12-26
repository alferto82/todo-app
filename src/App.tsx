import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoutes from "./routes/private.routes";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { TASK_LIST, TOKEN_NAME } from "./constants";
import Header from "./components/Header/Header";
import { Task } from "./types";
import { tasksActions } from "./store/task";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  if (localStorage.getItem(TOKEN_NAME)) {
    dispatch(authActions.login());
  }
  const tasks = localStorage.getItem(TASK_LIST);
  if (tasks) {
    dispatch(tasksActions.clearAll());
    JSON.parse(tasks).map((task: Task) => {
      dispatch(tasksActions.addTask(task));
    })
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RestrictedRoute />}>
          <Route path="/" element={<PrivateRoutes />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

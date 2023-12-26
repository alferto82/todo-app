import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoutes from "./routes/private.routes";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { TOKEN_NAME } from "./constants";
import Header from "./components/Header/Header";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  if (localStorage.getItem(TOKEN_NAME)) {
    dispatch(authActions.login());
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Header = (): JSX.Element => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    return navigate("/login");
  };

  return (
    <>
      {isAuthenticated ? (
        <Button onClick={logoutHandler} variant="contained">
          Logout
        </Button>
      ) : null}
    </>
  );
};

export default Header;

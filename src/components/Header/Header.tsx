import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Header.scss";
import Logout from "../Auth/Logout";

const Header = (): JSX.Element => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <header>
      <h1>Sparta</h1>
      {isAuthenticated ? <Logout /> : null}
    </header>
  );
};

export default Header;

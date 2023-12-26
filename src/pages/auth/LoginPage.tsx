import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginHandler = () => {
    dispatch(authActions.login());
    return navigate("/");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>
        You need to be logged into the application. Click on the button for it{" "}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button onClick={loginHandler} variant="outlined">
          Login
        </Button>
      </Box>
    </Grid>
  );
};

export default LoginPage;

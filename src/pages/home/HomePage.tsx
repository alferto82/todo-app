import { Box, Button, Container, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/task";
import TodoList from "../../components/Task/TodoList";
import { useState } from "react";

const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const addHandler = () => {
    dispatch(
      tasksActions.addTask({ id: "1", title: inputValue, check: false })
    );
    setInputValue("");
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Box textAlign="center" paddingTop="1em" height="2em">
        <TextField
          sx={{ width: "70%", marginBottom: 1 }}
          variant="outlined"
          onChange={(e) => setInputValue(e.target.value)}
          label="Type your task"
          value={inputValue}
        />
        <Button
          variant="outlined"
          onClick={addHandler}
          disabled={inputValue!.length === 0}
          sx={{ height: 55, marginBottom: 1 }}
        >
          Add
        </Button>
      </Box>

      <TodoList></TodoList>
    </Container>
  );
};

export default HomePage;

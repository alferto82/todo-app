import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import TodoItem from "./TodoItem";
import { Button, List } from "@mui/material";
import { tasksActions } from "../../store/task";

const TodoList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.task);

  const handleClear = () => {
    dispatch(tasksActions.clearAll());
  };

  if (list.length === 0) {
    return <h2>LIST IS EMPTY</h2>;
  }
  return (
    <>
      <List>
        {list.map((item) => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </List>
      <Button variant="outlined" onClick={handleClear}>
        Clear all
      </Button>
    </>
  );
};

export default TodoList;

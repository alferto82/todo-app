import { useState } from "react";
import { Task } from "../../types";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/task";
import {
  Checkbox,
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

const TodoItem = ({ item }: { item: Task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputEditValue, setInputEditValue] = useState("");

  const handleRemove = () => {
    dispatch(tasksActions.removeTask({ id: item.id }));
  };

  const handleEdit = () => {
    setInputEditValue(item.title);
    setIsEditing(true);
  };

  const handleToggle = () => {
    dispatch(tasksActions.toggleCheck({ id: item.id }));
  };

  const handleEditOk = () => {
    dispatch(
      tasksActions.updateTask({
        id: item.id,
        check: item.check,
        title: inputEditValue,
      })
    );
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const drawButtons = () => {
    return !isEditing ? (
      <Stack data-testid="todoItem" direction="row" spacing={1}>
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
        <IconButton disabled={item.check} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Stack>
    ) : null;
  };

  return (
    <ListItem divider secondaryAction={drawButtons()}>
      <ListItemAvatar>
        <Checkbox value={true} checked={item.check} onClick={handleToggle} />
      </ListItemAvatar>
      {isEditing ? (
        <Input
          fullWidth
          defaultValue={item.title}
          onChange={(e) => setInputEditValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleEditOk}>
                <DoneIcon />
              </IconButton>
              <IconButton onClick={handleEditCancel}>
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      ) : (
        <ListItemText
        sx={{ textDecoration: item.check? "line-through": null }}
          primary={<Typography key={item.id}>{item.title}</Typography>}
        />
      )}
    </ListItem>
  );
};

export default TodoItem;

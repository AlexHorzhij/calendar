import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { TextField } from "@mui/material";
import { editTask, removeTask } from "../utils/actions";
import { API } from "../utils/API";
import { Task } from "../types/calendar";

export const EditTaskInput = ({
  data,
  setAllTasks,
  setIsEditing,
}: {
  data: Task;
  setAllTasks: Dispatch<SetStateAction<Task[]>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const [taskData, setTaskData] = useState<Task>(data);
  const [isPending, startTransition] = useTransition();

  const submitForm = async (formData: FormData) => {
    const title = formData.get("title") as string;

    if (!title) {
      removeTask(taskData.id);
    }
    const newTask = { ...taskData, title };

    setTaskData(newTask);

    editTask(newTask);
    startTransition(async () => {
      setIsEditing(false);
      setAllTasks(await API.getAllTasks());
    });
  };

  const onEsc = (e: React.KeyboardEvent) => {
    if (e && e.code === "Escape") {
      setIsEditing(false);
      (e.target as HTMLInputElement).form?.reset();
    }
  };

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsEditing(false);
    } else {
      e.target.form?.requestSubmit();
    }
  };

  return (
    <form action={submitForm}>
      <TextField
        name="title"
        aria-label="new task"
        size="small"
        variant="standard"
        autoFocus={true}
        disabled={isPending}
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        onBlur={onBlurInput}
        onKeyDown={onEsc}
      />
    </form>
  );
};

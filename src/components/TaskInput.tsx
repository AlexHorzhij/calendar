import { Dispatch, SetStateAction, useTransition } from "react";
import { TextField } from "@mui/material";

import { addNewTask } from "../utils/actions";
import { API } from "../utils/API";
import { Day, Task } from "../types/calendar";

export const TaskInput = ({
  dayData,
  setIsNewTask,
  setAllTasks,
}: {
  dayData: Day;
  setIsNewTask: Dispatch<SetStateAction<boolean>>;
  setAllTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const submitForm = async (formData: FormData) => {
    const taskTitle = formData.get("title");
    const taskDate = formData.get("date");

    const task: Task = {
      id: crypto.randomUUID(),
      title: taskTitle as string,
      date: new Date(taskDate as string),
    };

    addNewTask(task);
    startTransition(async () => {
      setIsNewTask(false);
      setAllTasks(await API.getAllTasks());
    });
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
        onBlur={(e) => {
          if (!e.target.value) {
            setIsNewTask(false);
          } else {
            e.target.form?.requestSubmit();
          }
        }}
      />
      <input type="hidden" name="date" value={dayData.date.toDateString()} />
    </form>
  );
};

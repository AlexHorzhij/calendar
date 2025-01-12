import { Dispatch, SetStateAction, useTransition } from "react";
import { TextField } from "@mui/material";

import { addNewTask } from "../utils/actions";
import { API } from "../utils/API";
import { Day, Task } from "../types/calendar";

export const TaskInput = ({
  dayData,
  setIsNewTask,
  setAllTasks,
  tasksNumber,
}: {
  dayData: Day;
  setIsNewTask: Dispatch<SetStateAction<boolean>>;
  setAllTasks: Dispatch<SetStateAction<Task[]>>;
  tasksNumber: number;
}) => {
  const [isPending, startTransition] = useTransition();

  const submitForm = async (formData: FormData) => {
    const taskTitle = formData.get("title");
    const taskDate = formData.get("date");

    const task: Task = {
      id: crypto.randomUUID(),
      title: taskTitle as string,
      date: new Date(taskDate as string),
      order: tasksNumber + 1,
    };

    addNewTask(task);
    startTransition(async () => {
      setAllTasks(await API.getAllTasks());
      setIsNewTask(false);
    });
  };

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsNewTask(false);
    } else {
      e.target.form?.requestSubmit();
    }
  };

  const onEsc = (e: React.KeyboardEvent) => {
    if (e && e.code === "Escape") {
      setIsNewTask(false);
      (e.target as HTMLInputElement).form?.reset();
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
        onBlur={onBlurInput}
        onKeyDown={onEsc}
      />
      <input type="hidden" name="date" value={dayData.date.toDateString()} />
    </form>
  );
};

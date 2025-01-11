import { Task } from "../types/calendar";
import { API } from "./API";

export async function addNewTask(task: Task) {
  try {
    API.addNewTask(task);
    return API.getAllTasks() as Promise<Task[]>;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editTask(newTask: Task) {
  try {
    API.editTask(newTask.id, newTask);
    return API.getAllTasks() as Promise<Task[]>;
  } catch (error) {
    console.log("error: ", error);
  }
}
export async function removeTask(id: string) {
  try {
    API.deleteTask(id);
    return API.getAllTasks() as Promise<Task[]>;
  } catch (error) {
    console.log("error: ", error);
  }
}

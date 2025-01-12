import { Task } from "../types/calendar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HOLIDAY_API_BASE_URL = import.meta.env.VITE_HOLIDAY_API_BASE_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const handleError = (error: any, message: any) => {
  console.error(message, error);
  return [];
};

export const API = {
  fetchHolidays: async (
    countryCode = "UA",
    year = new Date().getFullYear()
  ) => {
    try {
      const url = `${HOLIDAY_API_BASE_URL}/PublicHolidays/${year}/${countryCode}`;
      const response = await fetch(url);

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error fetching holidays:");
    }
  },

  addNewTask: async (task: Task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error adding new task:");
    }
  },

  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error fetching tasks:");
    }
  },

  editTask: async (id: string, task: Task) => {
    try {
      const url = `${API_BASE_URL}/tasks/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error editing task:");
    }
  },

  deleteTask: async (id: string) => {
    try {
      const url = `${API_BASE_URL}/tasks/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error deleting task:");
    }
  },

  getAllCountries: async () => {
    try {
      const url = `${HOLIDAY_API_BASE_URL}/AvailableCountries`;
      const response = await fetch(url);

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Error fetching countries:");
    }
  },
};

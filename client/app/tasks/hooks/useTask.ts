import { fetcher } from "../../../utils/fetch";
import { useState } from "react";

type Task = {
  id: number;
  name: string;
};

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    try {
      const data = await fetcher("api/tasks", "GET");
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskName: string) => {
    console.log("Adding task:", taskName);
    try {
      await fetcher("api/tasks", "POST", { name: taskName });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await fetcher(`api/tasks/${taskId}`, "DELETE");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    fetchTasks,
  };
};

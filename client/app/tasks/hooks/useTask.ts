import { fetcher } from "../../../utils/fetch";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
};

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetcher("tasks", "GET");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }
  , []);

  const addTask = async (taskName: string) => {
    try {
      const newTask = await fetcher("tasks", "POST", { name: taskName });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const deleteTask = async (taskId: number) => {
    try {
      await fetcher(`tasks/${taskId}`, "DELETE");
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  // TODO: 時間があれば更新機能を実装する
  // const updateTask = async (taskId: number, updatedName: string) => {
  //   try {
  //     const updatedTask = await fetcher(`tasks/${taskId}`, "PUT", { name: updatedName });
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
  //     );
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // }
  return {
    tasks,
    addTask,
    deleteTask,
  };
}



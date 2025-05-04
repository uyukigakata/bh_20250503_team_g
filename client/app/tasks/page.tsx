"use client";
import Link from "next/link";
import { useTask } from "./hooks/useTask";
import { useEffect, useState } from "react";

export default function Page() {
  const [taskTitle, setTaskTitle] = useState("");
  const { tasks, addTask, deleteTask, fetchTasks } = useTask();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== "") {
      await addTask(taskTitle);
      await fetchTasks();
      setTaskTitle("");
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    console.log("Deleting task:", taskId);
    await deleteTask(taskId);
    await fetchTasks();
  };
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedCheckbox(selectedCheckbox === value ? null : value); // クリックで選択＆解除
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
        <Link href="/">
          <div className="text-[#0e141b] flex w-12 h-12 shrink-0 items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
        </Link>
        <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          一日五分習慣をスタートする
        </h2>
      </div>

      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Todays tasks
      </h2>

      {/* タスク追加フォーム */}
      <form
        onSubmit={handleAddTask}
        className="flex gap-2 justify-center items-center p-4 rounded-lg"
      >
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="タスクを入力"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          追加
        </button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
          <p className="text-[#0e141b] text-base font-normal flex-1 truncate">
            {task.name}
          </p>

          {/* 修正: 選択状態を task.id で管理 */}
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#d0dbe7] border-2 bg-transparent text-[#1980e6] checked:bg-[#1980e6] checked:border-[#1980e6] focus:ring-0 focus:outline-none"
            checked={selectedCheckbox === task.id.toString()} // 修正: task.id を比較
            onChange={() => handleChange(task.id.toString())} // 修正: task.id をセット
          />

          <div className="flex items-center gap-3">
            <button
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              onClick={() => handleDeleteTask(task.id)}
            >
              削除
            </button>
          </div>
        </div>
      ))}
      <Link href="/timer">
        <div className="flex px-4 py-3 mx-auto">
          <button
            className="mx-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1980E6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">タスクを開始する</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

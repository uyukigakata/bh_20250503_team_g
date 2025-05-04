"use client";
import Link from "next/link";
import { useState } from "react";
export default function Page() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "勉強", completed: false },
    ]);
    const [taskTitle, setTaskTitle] = useState("");

    const addTask = (event: React.FormEvent) => {
        event.preventDefault();
        if (taskTitle.trim()) {
            setTasks([...tasks, { id: tasks.length + 1, title: taskTitle, completed: false }]);
            setTaskTitle("");
        }
    };
    const handleDelete = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
        >
            <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
                <Link href="/">
                    <div className="text-[#0e141b] flex w-12 h-12 shrink-0 items-center cursor-pointer" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                    </div>
                </Link>
                <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">一日五分習慣をスタートする</h2>
            </div>
            <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Todays tasks</h2>
            {/* タスク追加フォーム */}
            <form onSubmit={addTask} className="flex gap-2 justify-center items-center  p-4 rounded-lg ">
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
                    <p className="text-[#0e141b] text-base font-normal flex-1 truncate">{task.title}</p>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-[#d0dbe7] border-2 bg-transparent text-[#1980e6] checked:bg-[#1980e6] checked:border-[#1980e6] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d0dbe7] focus:outline-none"
                            checked={selectedTaskId === task.id}
                            onChange={() => setSelectedTaskId(task.id)}
                        />
                        <button
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                            onClick={() => handleDelete(task.id)}
                        >
                            削除
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex px-4 py-3">
                <Link href="/timer">
                <button
                    className="flex min-w-[84px] mx-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1980e6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
                >
                    <span className="truncate">タスクを始める</span>
                </button>
                </Link>
            </div>
            <div className="h-5 bg-slate-50"></div>
        </div>
    );
}
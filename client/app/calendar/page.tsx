"use client";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";

type TaskStatus = Record<string, boolean>;

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [taskStatus, setTaskStatus] = useState<TaskStatus>({
        "2025-05-01": true,
        "2025-05-02": false,
        "2025-05-03": true,
    });
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });
    const handleNextMonth = () => setCurrentMonth((prev) =>addMonths(prev,1));
    const handlePrevMonth = () => setCurrentMonth((prev) =>subMonths(prev,1));
    return (
        <div className="max-w-md mx-auto p-4  mt-10 rounded-lg shadow">
                  <div className="flex justify-between mb-2">
        <button className="p-2 bg-gray-300 rounded" onClick={handlePrevMonth}>← 前月</button>
        <h2 className="text-xl font-bold text-blue-700 text-center">
                {format(currentMonth, "yyyy年MM月")}
            </h2>
        <button className="p-2 bg-gray-300 rounded" onClick={handleNextMonth}>次月 →</button>
      </div>
            <div className="grid grid-cols-7 gap-3 mt-4">
                {days.map((day) => {
                    const formattedDate = format(day, "yyyy-MM-dd");
                    const isCompleted = taskStatus[formattedDate] ?? false;
                    return (
                        <div
                            key={formattedDate}
                            className={`p-3 rounded text-center transition ${isCompleted ? "bg-blue-600 rounded-full text-white hover:bg-blue-500 cursor-pointer" : "text-black cursor-default opacity-50"}`}
                            onClick={() => isCompleted && setSelectedDay(formattedDate)} 
                        >
                            {format(day, "dd")}
                        </div>

                    );
                })}
            </div>
            {selectedDay && (
                <div className="mt-6 p-4 bg-white border border-blue-300 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-blue-700">
                        📅 {selectedDay} の感想
                    </h3>
                    <p className="mt-2 text-blue-600">
                        {taskStatus[selectedDay] ? "達成できた！" : "未達成…"}
                    </p>
                    <button
                        className="mt-3 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => setSelectedDay(null)}
                    >
                        閉じる
                    </button>
                </div>
            )}
        </div>
    );
};

export default Calendar;


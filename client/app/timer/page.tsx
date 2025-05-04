"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import TimerAnimation from "../../components/TimerAnimation";
export default function Timer() {
    const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [feedback, setFeedback] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement | null>(null); // useRefの型情報を追加

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft === 0 && videoRef.current) {
            videoRef.current.play();
        }
    }, [timeLeft]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <TimerAnimation />

            <div className="text-xl font-semibold mb-4">
                残り時間: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <video ref={videoRef} src="/bgm.mp4" style={{ display: "none" }} />
            <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => {
                    setIsRunning(false);
                    if (videoRef.current) videoRef.current.pause();
                }}
            >
                終了
            </button>
            {/* モーダルウィンドウ */}
            {!isRunning && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">感想を入力してください</h2>
                        <textarea
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            rows={3}
                            value={feedback}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                            placeholder="タスクの調子はどうでしたか？"
                        />
                        <div className="flex justify-end mt-4">
                            <Link href="/">
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                    onClick={() => setIsRunning(true)} // 閉じる
                                >
                                    送信
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

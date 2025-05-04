"use client";
import PlantAnimation from "../../components/PlantAnimation";
import { useEffect, useState } from "react";
import Link from "next/link";

const Homepage = () => {
  const [isWaterable, setIsWaterable] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [isBroken, setIsBroken] = useState<boolean>(false);

  useEffect(() => {
    // ローカルストレージから水やり可否を確認
    const canWater = localStorage.getItem("waterable") === "true";
    setIsWaterable(canWater);

    const fetchStreakData = async () => {
      try {
        const res = await fetch("/api/streak", { cache: "no-store" });
        const data = await res.json();
        setStreakCount(data.streakCount);
        setIsBroken(data.isBroken);
      } catch (error) {
        console.error("習慣データの取得に失敗しました", error);
      }
    };

    fetchStreakData();
  }, []);

  const handleWater = () => {
    const newCount = streakCount + 1;
    setStreakCount(newCount);
    setIsWaterable(false);
    localStorage.setItem("waterable", "false");
    // バックエンド更新処理も必要ならここに追加
  };

  const buttonColor = isWaterable
    ? "bg-blue-500 hover:bg-blue-500"
    : "bg-gray-400 hover:bg-gray-300";

  return (
    <div>
      <PlantAnimation streakCount={streakCount} isBroken={isBroken} />
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          disabled={!isWaterable}
          onClick={handleWater}
          className={`${buttonColor} text-white font-bold py-2 px-4 rounded-4xl min-w-[200px]`}
        >
          水やり
        </button>
        <Link href="/tasks" className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-4xl min-w-[200px]">
            Start Task
          </button>
        </Link>
        <Link href="/calendar" className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-4xl min-w-[200px]">
            タスク履歴を見る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

"use client";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [isWaterable, setIsWaterable] = useState<boolean>(false);

  const buttonColor = isWaterable
    ? "bg-blue-500 hover:bg-blue-500"
    : "bg-gray-400 hover:bg-gray-300";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className={`${buttonColor} text-white font-bold py-2 px-4 rounded-4xl min-w-[200px]`}
        onClick={() => setIsWaterable((prev) => !prev)}
      >
        水やり
      </button>
      <Link href="/tasks" className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-4xl min-w-[200px]">
          Start Task
        </button>
      </Link>
    </div>
  );
};

export default Home;

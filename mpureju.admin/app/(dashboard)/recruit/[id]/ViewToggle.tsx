"use client";

import { useState } from "react";

export function ViewToggle({
  normal,
  resume,
}: {
  normal: React.ReactNode;
  resume: React.ReactNode;
}) {
  const [view, setView] = useState<"normal" | "resume">("normal");

  return (
    <>
      <div className="flex gap-2 mb-6 print:hidden">
        <button
          onClick={() => setView("normal")}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            view === "normal"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          通常表示
        </button>
        <button
          onClick={() => setView("resume")}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            view === "resume"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          📄 履歴書形式
        </button>
      </div>

      {view === "normal" ? normal : resume}
    </>
  );
}

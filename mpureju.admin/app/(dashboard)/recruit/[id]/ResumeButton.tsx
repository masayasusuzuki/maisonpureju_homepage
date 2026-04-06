"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export function ResumeButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
      >
        📄 履歴書
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* 背景ぼかし */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* モーダルウィンドウ */}
          <div
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{ width: "90vw", maxWidth: "960px", height: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <span className="text-sm font-medium text-gray-700">履歴書</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const iframe = document.getElementById("resume-iframe") as HTMLIFrameElement;
                    iframe?.contentWindow?.print();
                  }}
                  className="px-4 py-1.5 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  印刷 / PDF保存
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* iframe で履歴書ページを表示 */}
            <iframe
              id="resume-iframe"
              src={`/resume/${id}`}
              className="w-full border-0"
              style={{ height: "calc(85vh - 52px)" }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

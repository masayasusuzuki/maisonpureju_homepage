"use client";

import { useState } from "react";

type ScoreItem = {
  score: number;
  max: number;
  comment: string;
};

type AnalysisData = {
  scores: Record<string, ScoreItem>;
  total: number;
  ai_suspicion: {
    flagged: boolean;
    reason: string;
  };
  summary: string;
  negatives: string[];
};

const LABELS: Record<string, string> = {
  photo:            "写真",
  age:              "年齢",
  education:        "学歴",
  career:           "職歴",
  motivation:       "志望動機",
  self_pr:          "自己PR",
  qualification:    "資格・免許",
  document_quality: "書類の丁寧さ",
};


export function AiAnalysis({
  applicationId,
  initialAnalysis,
}: {
  applicationId: string;
  initialAnalysis: string | null;
}) {
  const [rawAnalysis, setRawAnalysis] = useState(initialAnalysis ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/recruit/${applicationId}/analyze`, { method: "POST" });
    const json = await res.json();
    setLoading(false);
    if (res.ok) setRawAnalysis(json.analysis);
    else setError(json.error ?? "分析に失敗しました");
  }

  let parsed: AnalysisData | null = null;
  if (rawAnalysis) {
    try { parsed = JSON.parse(rawAnalysis); } catch { /* fallback */ }
  }

  // 未分析
  if (!rawAnalysis && !loading) {
    return (
      <div className="bg-white rounded border border-gray-200 mb-5">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60">
          <h2 className="text-[11px] font-semibold text-gray-500 tracking-[0.15em] uppercase">書類採点</h2>
        </div>
        <div className="text-center py-10">
          <p className="text-[13px] text-gray-400 mb-4">応募書類の自動採点を実行できます</p>
          <button
            onClick={handleGenerate}
            className="px-5 py-2 text-[13px] bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            採点を実行
          </button>
          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded border border-gray-200 mb-5">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60">
          <h2 className="text-[11px] font-semibold text-gray-500 tracking-[0.15em] uppercase">書類採点</h2>
        </div>
        <div className="flex items-center gap-2.5 justify-center py-12">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          <span className="text-[13px] text-gray-400">採点処理中...</span>
        </div>
      </div>
    );
  }

  if (!parsed) {
    return (
      <div className="bg-white rounded border border-gray-200 mb-5">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60">
          <h2 className="text-[11px] font-semibold text-gray-500 tracking-[0.15em] uppercase">書類採点</h2>
        </div>
        <div className="p-5 text-[13px] text-gray-600 whitespace-pre-wrap">{rawAnalysis}</div>
      </div>
    );
  }

  const { scores, total, ai_suspicion, summary, negatives } = parsed;
  const scoreEntries = Object.entries(scores);

  return (
    <div className="bg-white rounded border border-gray-200 mb-5">
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/60">
        <h2 className="text-[11px] font-semibold text-gray-500 tracking-[0.15em] uppercase">書類採点</h2>
        <span className="text-[10px] text-gray-300">Powered by Gemini</span>
      </div>

      <div className="p-5">
        {/* 上部: スコア + テーブル */}
        <div className="flex flex-col gap-5">
          {/* スコアリング */}
          <div className="flex gap-4 items-stretch">
            {/* 点数 */}
            <div className="flex-1 border border-gray-200 rounded-lg px-6 py-5 flex items-center gap-5">
              <div>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-2">Total Score</p>
                <p className="text-5xl font-bold text-gray-900 leading-none tabular-nums">{total}<span className="text-lg text-gray-300 font-normal ml-1">/ 100</span></p>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed border-l border-gray-200 pl-5">
                {summary || "—"}
              </p>
            </div>
            {/* ランク */}
            {(() => {
              const rank = total >= 80 ? "S" : total >= 70 ? "A" : total >= 60 ? "B" : total >= 50 ? "C" : total >= 40 ? "D" : "E";
              const rankBorder = total >= 70 ? "border-emerald-400" : total >= 50 ? "border-amber-400" : "border-red-400";
              const rankText = total >= 70 ? "text-emerald-600" : total >= 50 ? "text-amber-600" : "text-red-600";
              const rankDesc =
                rank === "S" ? "極めて優秀" :
                rank === "A" ? "優秀" :
                rank === "B" ? "良好" :
                rank === "C" ? "標準" :
                rank === "D" ? "要検討" : "不適合";
              return (
                <div className={`w-40 border ${rankBorder} rounded-lg px-5 py-5 flex flex-col items-center justify-center`}>
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-2">Rank</p>
                  <p className={`text-5xl font-black leading-none ${rankText}`}>{rank}</p>
                  <p className={`text-xs font-medium mt-2 ${rankText}`}>{rankDesc}</p>
                </div>
              );
            })()}
            {/* AI疑惑 */}
            {ai_suspicion?.flagged && (
              <div className="w-40 border border-amber-300 rounded-lg px-5 py-5 flex flex-col items-center justify-center">
                <p className="text-[10px] text-amber-500 tracking-widest uppercase mb-2">Alert</p>
                <p className="text-2xl leading-none mb-1">🤖</p>
                <p className="text-[10px] font-semibold text-amber-700">AI生成疑惑</p>
              </div>
            )}
          </div>

          {/* 項目一覧 */}
          <div className="flex-1">
            {scoreEntries.map(([key, item]) => {
              const pct = Math.round((item.score / item.max) * 100);
              const barColor =
                pct >= 70 ? "bg-emerald-600" :
                pct >= 50 ? "bg-amber-500" :
                "bg-red-500";
              return (
                <div key={key} className="py-3.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-800 font-semibold w-24 flex-shrink-0">{LABELS[key] ?? key}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-lg font-bold text-gray-900 tabular-nums flex-shrink-0 w-20 text-right">
                      {item.score}<span className="text-sm text-gray-300 font-normal">/{item.max}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 pl-28 leading-relaxed">{item.comment}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI疑惑 */}
        {ai_suspicion?.flagged && ai_suspicion.reason && (
          <div className="mt-4 flex gap-3 px-4 py-3 bg-amber-50/60 border border-amber-100 rounded text-[11px]">
            <span className="font-semibold text-amber-800 flex-shrink-0">AI疑惑:</span>
            <span className="text-amber-700 leading-relaxed">{ai_suspicion.reason}</span>
          </div>
        )}

        {/* 懸念事項 */}
        {negatives && negatives.length > 0 && (
          <div className="mt-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded">
            <p className="text-[11px] font-semibold text-gray-600 mb-2">懸念事項</p>
            <ul className="space-y-1">
              {negatives.map((n, i) => (
                <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">–</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

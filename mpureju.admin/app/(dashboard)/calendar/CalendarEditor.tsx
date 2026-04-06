"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const WEEKDAYS = [
  { value: 0, label: "日曜" },
  { value: 1, label: "月曜" },
  { value: 2, label: "火曜" },
  { value: 3, label: "水曜" },
  { value: 4, label: "木曜" },
  { value: 5, label: "金曜" },
  { value: 6, label: "土曜" },
] as const;

type RegularHoliday = { day_of_week: number; label: string };
type Override = { id: string; date: string; type: "extra" | "cancel"; note: string | null };

interface Props {
  initialHolidays: RegularHoliday[];
  initialOverrides: Override[];
}

export function CalendarEditor({ initialHolidays, initialOverrides }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  // 定休曜日
  const [selectedDays, setSelectedDays] = useState<Set<number>>(
    () => new Set(initialHolidays.map((h) => h.day_of_week))
  );

  // 臨時休診日
  const extraOverrides = initialOverrides.filter((o) => o.type === "extra");
  const cancelOverrides = initialOverrides.filter((o) => o.type === "cancel");
  const [extraText, setExtraText] = useState(() =>
    extraOverrides.map((o) => o.date).join("\n")
  );
  const [cancelText, setCancelText] = useState(() =>
    cancelOverrides.map((o) => o.date).join("\n")
  );

  const flash = (type: "ok" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const parseDates = (text: string): string[] =>
    text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^\d{4}-\d{2}-\d{2}$/.test(l));

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // 1. 定休曜日を更新
      const regularHolidays = Array.from(selectedDays).map((day) => ({
        day_of_week: day,
        label: WEEKDAYS.find((w) => w.value === day)!.label,
      }));

      const res1 = await fetch("/api/calendar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regularHolidays }),
      });
      if (!res1.ok) throw new Error("定休曜日の保存に失敗しました");

      // 2. 既存 overrides を全削除
      for (const o of initialOverrides) {
        await fetch("/api/calendar", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: o.id }),
        });
      }

      // 3. 臨時休診日を再挿入
      const extraDates = parseDates(extraText);
      for (const date of extraDates) {
        const res = await fetch("/api/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, type: "extra" }),
        });
        if (!res.ok) throw new Error(`臨時休診日 ${date} の保存に失敗しました`);
      }

      // 4. 定休取消日を再挿入
      const cancelDates = parseDates(cancelText);
      for (const date of cancelDates) {
        const res = await fetch("/api/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, type: "cancel" }),
        });
        if (!res.ok) throw new Error(`定休取消日 ${date} の保存に失敗しました`);
      }

      flash("ok", "保存しました");
      router.refresh();
    } catch (e) {
      flash("error", e instanceof Error ? e.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* 定休曜日 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-1">定休曜日</h2>
        <p className="text-xs text-gray-400 mb-3">クリックで選択・解除</p>
        <div className="flex gap-2">
          {WEEKDAYS.map((w) => {
            const active = selectedDays.has(w.value);
            return (
              <button
                key={w.value}
                onClick={() => toggleDay(w.value)}
                className={`px-3 py-2 rounded-md text-sm border transition-colors ${
                  active
                    ? "bg-brand-gold text-white border-brand-gold"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {w.label.replace("曜", "")}
              </button>
            );
          })}
        </div>
      </section>

      {/* 臨時休診日 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-1">臨時休診日</h2>
        <p className="text-xs text-gray-400 mb-3">
          1行に1日付（YYYY-MM-DD形式）で入力。例: 2026-01-01
        </p>
        <textarea
          value={extraText}
          onChange={(e) => setExtraText(e.target.value)}
          rows={8}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
          placeholder="2026-01-01"
        />
        <p className="text-right text-[10px] text-gray-300 mt-1">
          {parseDates(extraText).length} 件
        </p>
      </section>

      {/* 定休取消日 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-1">定休取消日（営業する日）</h2>
        <p className="text-xs text-gray-400 mb-3">
          定休曜日だが営業する日。1行に1日付（YYYY-MM-DD形式）で入力
        </p>
        <textarea
          value={cancelText}
          onChange={(e) => setCancelText(e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
          placeholder="2026-12-29"
        />
        <p className="text-right text-[10px] text-gray-300 mt-1">
          {parseDates(cancelText).length} 件
        </p>
      </section>

      {/* 保存 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-brand-gold text-white text-sm rounded-md hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
        >
          {saving ? "保存中..." : "保存する"}
        </button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "ok" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}

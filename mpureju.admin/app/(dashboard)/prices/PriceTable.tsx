"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PriceItem = {
  id: number;
  section: string;
  sub_tab: string;
  category: string;
  option: string | null;
  price: string;
  sort_order: number;
};

const SECTIONS = ["皮膚科", "外科", "点滴", "内服薬", "化粧品", "その他"];

export function PriceTable({ items }: { items: PriceItem[] }) {
  const [sectionFilter, setSectionFilter] = useState("すべて");
  const [subTabFilter, setSubTabFilter] = useState("すべて");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<PriceItem>>({});
  const router = useRouter();

  const filteredBySection =
    sectionFilter === "すべて"
      ? items
      : items.filter((i) => i.section === sectionFilter);

  const subTabs = [
    "すべて",
    ...Array.from(new Set(filteredBySection.map((i) => i.sub_tab))),
  ];

  const filtered =
    subTabFilter === "すべて"
      ? filteredBySection
      : filteredBySection.filter((i) => i.sub_tab === subTabFilter);

  const startEdit = (item: PriceItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const res = await fetch("/api/prices", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        section: editForm.section,
        sub_tab: editForm.sub_tab,
        category: editForm.category,
        option: editForm.option || null,
        price: editForm.price,
        sort_order: editForm.sort_order,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      alert("保存に失敗しました: " + error);
      return;
    }
    setEditingId(null);
    setEditForm({});
    router.refresh();
  };

  const deleteItem = async (id: number, category: string) => {
    if (!confirm(`「${category || "(空)"}」を削除しますか？`)) return;
    const res = await fetch("/api/prices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      alert("削除に失敗しました: " + error);
      return;
    }
    router.refresh();
  };

  return (
    <div>
      {/* Section filter */}
      <div className="flex gap-1.5 mb-3">
        {["すべて", ...SECTIONS].map((s) => (
          <button
            key={s}
            onClick={() => {
              setSectionFilter(s);
              setSubTabFilter("すべて");
            }}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              sectionFilter === s
                ? "bg-brand-dark text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Sub-tab filter */}
      {sectionFilter !== "すべて" && subTabs.length > 2 && (
        <div className="flex gap-1 mb-4 flex-wrap">
          {subTabs.map((s) => (
            <button
              key={s}
              onClick={() => setSubTabFilter(s)}
              className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                subTabFilter === s
                  ? "bg-brand-gold text-white"
                  : "bg-white border border-gray-200 text-gray-400 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-20">区分</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-32">サブタブ</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">カテゴリ</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-36">オプション</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 w-28">価格</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-12">順</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                {editingId === item.id ? (
                  <>
                    <td className="px-4 py-2">
                      <select
                        value={editForm.section}
                        onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5"
                      >
                        {SECTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editForm.sub_tab}
                        onChange={(e) => setEditForm({ ...editForm, sub_tab: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editForm.option ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, option: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5"
                        placeholder="—"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 text-right"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        value={editForm.sort_order}
                        onChange={(e) => setEditForm({ ...editForm, sort_order: Number(e.target.value) })}
                        className="w-12 text-xs border border-gray-200 rounded px-2 py-1.5 text-center"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        <button onClick={saveEdit} className="text-[10px] px-2 py-1 bg-brand-gold text-white rounded">保存</button>
                        <button onClick={cancelEdit} className="text-[10px] px-2 py-1 bg-gray-200 text-gray-600 rounded">取消</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.section}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{item.sub_tab}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-900">
                      {item.category || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{item.option ?? "—"}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-900 text-right tabular-nums">{item.price}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 text-center">{item.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(item)} className="text-[10px] px-2 py-1 text-brand-gold hover:bg-brand-cream rounded">編集</button>
                        <button onClick={() => deleteItem(item.id, item.category)} className="text-[10px] px-2 py-1 text-red-400 hover:bg-red-50 rounded">削除</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">{filtered.length} 件</p>
    </div>
  );
}

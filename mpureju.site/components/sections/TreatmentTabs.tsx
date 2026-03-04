"use client";

import { useState } from "react";
import Link from "next/link";

// Phase 1: 定義済みURLはそのまま使用。未定義のものは /treatment/[slug] 形式。
// Phase 2: microCMS treatments スキーマから動的取得に切り替え予定。
const TABS = [
  {
    id: "mouth",
    label: "口元",
    pillarHref: "/mouth",
    treatments: [
      { name: "口角挙上",        href: "/mouth/lip-lift" },
      { name: "M字リップ",       href: "/mouth/m-lip" },
      { name: "人中短縮",        href: "/mouth/philtrum" },
      { name: "口唇縮小",        href: "/mouth/lip-reduction" },
      { name: "ガミースマイル",  href: "/mouth/gummy-smile" },
      { name: "口唇拡大",        href: "/treatment/lip-enlargement" },
      { name: "外側人中短縮",    href: "/treatment/lateral-philtrum" },
      { name: "ピーナッツリップ", href: "/treatment/peanut-lip" },
    ],
  },
  {
    id: "eye",
    label: "目元",
    pillarHref: "/eye",
    treatments: [
      { name: "二重埋没",     href: "/eye/double-eyelid" },
      { name: "二重全切開",   href: "/eye/double-eyelid" },
      { name: "眼瞼下垂",     href: "/eye/ptosis" },
      { name: "眉下切開",     href: "/eye/brow-lift" },
      { name: "目頭切開",     href: "/eye/epicanthoplasty" },
      { name: "脱脂",         href: "/eye/under-eye" },
      { name: "ハムラ法",     href: "/eye/under-eye" },
      { name: "目尻切開",     href: "/treatment/eye-corner" },
      { name: "グラマラス",   href: "/treatment/glamorous" },
      { name: "蒙古襞形成",   href: "/treatment/epicanthal-fold" },
    ],
  },
  {
    id: "nose",
    label: "鼻",
    pillarHref: "/nose",
    treatments: [
      { name: "プロテーゼ",          href: "/nose/implant" },
      { name: "鼻尖形成",            href: "/nose/tip" },
      { name: "鼻翼縮小",            href: "/nose/alar" },
      { name: "鼻中隔延長",          href: "/nose/septum" },
      { name: "耳介軟骨移植",        href: "/treatment/ear-cartilage" },
      { name: "鼻骨骨切り",          href: "/treatment/nasal-osteotomy" },
      { name: "ハンプ切除",          href: "/treatment/hump" },
      { name: "鼻孔縁下降",          href: "/treatment/nostril-margin" },
      { name: "鼻翼基部形成（貴族）", href: "/treatment/alar-base" },
    ],
  },
  {
    id: "lift",
    label: "リフトアップ",
    pillarHref: "/lift",
    treatments: [
      { name: "糸リフト",            href: "/lift/thread" },
      { name: "ソフウェーブ",        href: "/lift/sofwave" },
      { name: "HIFU（ウルトラセルZi）", href: "/lift/hifu" },
      { name: "MACSフェイスリフト",  href: "/treatment/macs-facelift" },
      { name: "SMASフェイスリフト",  href: "/treatment/smas-facelift" },
      { name: "ネックリフト",        href: "/treatment/neck-lift" },
      { name: "脂肪吸引",            href: "/treatment/liposuction" },
      { name: "バッカルファット除去", href: "/treatment/buccal-fat" },
      { name: "脂肪注入",            href: "/treatment/fat-injection" },
    ],
  },
  {
    id: "skin",
    label: "美容皮膚科",
    pillarHref: "/skin",
    treatments: [
      { name: "ポテンツァ",           href: "/skin/potenza" },
      { name: "ボトックス",           href: "/skin/injection" },
      { name: "ヒアルロン酸",         href: "/skin/injection" },
      { name: "レーザー",             href: "/skin/laser" },
      { name: "IPL / フォトフェイシャル", href: "/treatment/ipl" },
      { name: "ピーリング",           href: "/treatment/peeling" },
      { name: "スキンブースター",     href: "/treatment/skin-booster" },
      { name: "脂肪溶解注射",         href: "/treatment/fat-dissolving" },
      { name: "サーマジェン（RF）",   href: "/treatment/thermagen" },
    ],
  },
] as const;

export function TreatmentTabs() {
  const [activeId, setActiveId] = useState<string>("mouth");
  const current = TABS.find((t) => t.id === activeId)!;

  return (
    <div>
      {/* タブ */}
      <div className="flex flex-wrap border-b border-[var(--color-brand-brown)]/20 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`relative px-4 md:px-6 py-3 text-sm tracking-wider transition-colors ${
              activeId === tab.id
                ? "text-[var(--color-brand-gold)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-brand-dark)]"
            }`}
          >
            {tab.label}
            {activeId === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-brand-gold)]" />
            )}
          </button>
        ))}
      </div>

      {/* 施術リスト */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-10">
        {current.treatments.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)] transition-colors"
          >
            <span className="text-[var(--color-brand-gold)] shrink-0">—</span>
            {item.name}
          </Link>
        ))}
      </div>

      {/* ピラーページへ */}
      <div className="flex justify-end">
        <Link
          href={current.pillarHref}
          className="text-xs tracking-widest text-[var(--color-text-secondary)] border-b border-current pb-0.5 hover:text-[var(--color-brand-gold)] transition-colors"
        >
          {current.label}の施術をすべて見る →
        </Link>
      </div>
    </div>
  );
}

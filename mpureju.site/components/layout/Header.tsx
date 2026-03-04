"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navCategories = [
  {
    label: "口元",
    href: "/mouth",
    items: [
      { label: "口角挙上", href: "/mouth/lip-lift" },
      { label: "M字リップ", href: "/mouth/m-lip" },
      { label: "人中短縮", href: "/mouth/philtrum" },
      { label: "口唇縮小", href: "/mouth/lip-reduction" },
      { label: "ガミースマイル", href: "/mouth/gummy-smile" },
      { label: "口元症例一覧", href: "/mouth/case" },
    ],
  },
  {
    label: "目元",
    href: "/eye",
    items: [
      { label: "二重整形", href: "/eye/double-eyelid" },
      { label: "眼瞼下垂", href: "/eye/ptosis" },
      { label: "眉下切開", href: "/eye/brow-lift" },
      { label: "目の下のたるみ・クマ", href: "/eye/under-eye" },
      { label: "目頭切開", href: "/eye/epicanthoplasty" },
      { label: "目元症例一覧", href: "/eye/case" },
    ],
  },
  {
    label: "鼻",
    href: "/nose",
    items: [
      { label: "プロテーゼ", href: "/nose/implant" },
      { label: "鼻尖形成", href: "/nose/tip" },
      { label: "鼻翼縮小", href: "/nose/alar" },
      { label: "鼻中隔", href: "/nose/septum" },
      { label: "鼻症例一覧", href: "/nose/case" },
    ],
  },
  {
    label: "リフトアップ",
    href: "/lift",
    items: [
      { label: "糸リフト", href: "/lift/thread" },
      { label: "ソフウェーブ", href: "/lift/sofwave" },
      { label: "HIFU", href: "/lift/hifu" },
      { label: "リフトアップ症例一覧", href: "/lift/case" },
    ],
  },
  {
    label: "美容皮膚科",
    href: "/skin",
    items: [
      { label: "ポテンツァ", href: "/skin/potenza" },
      { label: "注入治療", href: "/skin/injection" },
      { label: "レーザー治療", href: "/skin/laser" },
      { label: "皮膚科症例一覧", href: "/skin/case" },
    ],
  },
];

export function Header() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isTopPage = pathname === "/";
  const isTransparent = isTopPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    // 初期状態を確認（ページリロード時にスクロール済みの場合）
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-[var(--color-brand-white)] border-b border-[var(--color-brand-cream)]"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-en text-xl md:text-2xl tracking-widest transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-[var(--color-brand-dark)]"
              }`}
            >
              Maison PUREJU
            </span>
          </Link>

          {/* PC Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((cat) => (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => setOpenCategory(cat.label)}
                onMouseLeave={() => setOpenCategory(null)}
              >
                <Link
                  href={cat.href}
                  className={`px-3 py-2 text-sm transition-colors duration-300 ${
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)]"
                  }`}
                >
                  {cat.label}
                </Link>

                {/* Mega menu dropdown - 常に白背景 */}
                {openCategory === cat.label && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-[var(--color-brand-cream)] shadow-lg py-2">
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-dark)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/case"
              className={`px-3 py-2 text-sm transition-colors duration-300 ${
                isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)]"
              }`}
            >
              症例写真
            </Link>
            <Link
              href="/price"
              className={`px-3 py-2 text-sm transition-colors duration-300 ${
                isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)]"
              }`}
            >
              料金表
            </Link>
            <Link
              href="/doctor"
              className={`px-3 py-2 text-sm transition-colors duration-300 ${
                isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)]"
              }`}
            >
              院長紹介
            </Link>

            {/* 予約ボタン群 */}
            <div className="ml-3 flex items-center gap-2">
              <a
                href="https://lin.ee/maisonpureju"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#06C755] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                LINE予約
              </a>
              <a
                href="tel:0332891222"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isTransparent
                    ? "text-white hover:opacity-70"
                    : "text-[var(--color-brand-dark)] hover:text-[var(--color-brand-gold)]"
                }`}
              >
                03-3289-1222
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-[var(--color-text-primary)]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニュー"
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer - 常に白背景 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--color-brand-cream)] max-h-[80vh] overflow-y-auto">
          {navCategories.map((cat) => (
            <div key={cat.label}>
              <Link
                href={cat.href}
                className="block px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-brand-cream)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.label}
              </Link>
              {cat.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-10 py-2.5 text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-brand-cream)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/case"
            className="block px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-brand-cream)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            症例写真
          </Link>
          <Link
            href="/price"
            className="block px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-brand-cream)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            料金表
          </Link>
          <Link
            href="/doctor"
            className="block px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-brand-cream)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            院長紹介
          </Link>
        </div>
      )}
    </header>
  );
}

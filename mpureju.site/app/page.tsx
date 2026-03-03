import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison PUREJU｜銀座の美容外科・美容皮膚科",
  description:
    "銀座の美容外科・美容皮膚科クリニック。形成外科専門医が担当する目元・鼻・口元・リフトアップ・美容皮膚科の施術。",
};

import { MediaSectionPlaceholder } from "@/components/sections/MediaSection";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

// TODO: Replace MediaSectionPlaceholder with MediaSection once microCMS is connected
// import { MediaSection } from "@/components/sections/MediaSection";
// TODO: Import other section components as they are built
// import { HeroSection } from "@/components/sections/HeroSection";
// import { CampaignBanner } from "@/components/sections/CampaignBanner";
// import { FaceMenu } from "@/components/sections/FaceMenu";
// import { TreatmentNav } from "@/components/sections/TreatmentNav";
// import { CaseResults } from "@/components/sections/CaseResults";
// import { MediaSection } from "@/components/sections/MediaSection";
// import { ClinicInterior } from "@/components/sections/ClinicInterior";
// import { ValueSection } from "@/components/sections/ValueSection";
// import { DoctorMessage } from "@/components/sections/DoctorMessage";
// import { TeamSlide } from "@/components/sections/TeamSlide";
// import { NewsSection } from "@/components/sections/NewsSection";
// import { AccessSection } from "@/components/sections/AccessSection";
// import { ReserveCTA } from "@/components/sections/ReserveCTA";

export default function TopPage() {
  return (
    <>
      {/* Hero animations - inline <style> で確実にキーフレームを参照 */}
      <style>{`
        @keyframes hero-zoom-out {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Section 1: Hero */}
      <section className="sticky top-0 -mt-16 md:-mt-20 bg-[var(--color-brand-white)] px-3 pb-0">
        <div className="relative h-[100svh] rounded-2xl overflow-hidden">
          {/* 背景画像 - zoom-out */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/toppage/hero_background.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ animation: "hero-zoom-out 5s ease-out forwards" }}
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/10" />
          {/* テキスト - 各要素を時差フェードイン */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20 text-center px-6">
            <p
              className="font-en text-sm md:text-base tracking-[0.35em] text-white/80 mb-5 drop-shadow"
              style={{ animation: "hero-fade-in 0.9s ease-out both", animationDelay: "0.3s" }}
            >
              Ginza Cosmetic Surgery &amp; Dermatology
            </p>
            <h1
              className="font-en text-5xl md:text-7xl lg:text-8xl tracking-widest text-white mb-8 drop-shadow-lg"
              style={{ animation: "hero-fade-in 0.9s ease-out both", animationDelay: "0.6s" }}
            >
              Maison PUREJU
            </h1>
            <p
              className="text-sm md:text-lg text-white/80 tracking-widest drop-shadow"
              style={{ animation: "hero-fade-in 0.9s ease-out both", animationDelay: "1.0s" }}
            >
              あなたの人生を豊かにする美容医療
            </p>
          </div>
        </div>
      </section>

      {/* Section 2以降 - z-10 でheroの上に重なる */}
      <div className="relative z-10">

      {/* Section 2: Campaign Banner */}
      <section className="py-6 bg-white">
        <div className="section-container">
          <div className="h-32 md:h-48 bg-[var(--color-brand-cream)] flex items-center justify-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              キャンペーンバナー（microCMS campaigns から取得予定）
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Face Menu - お悩みから探す */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-white)]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Find Your Solution
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              お悩みから探す
            </h2>
          </div>
          <div className="h-80 bg-[var(--color-brand-cream)] flex items-center justify-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              フェイスメニュー（SVGインタラクティブUI実装予定）
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: 施術名から探す */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-cream)]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Treatment Menu
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              施術名から探す
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(
              [
                ["口元", "/mouth"],
                ["目元", "/eye"],
                ["鼻", "/nose"],
                ["リフトアップ", "/lift"],
                ["美容皮膚科", "/skin"],
              ] as const
            ).map(([cat, href]) => (
              <a
                key={cat}
                href={href}
                className="block p-6 bg-white text-center hover:shadow-md transition-shadow group"
              >
                <p className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-brand-gold)] transition-colors">
                  {cat}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: 症例実績 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Case Results
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              症例実績
            </h2>
          </div>
          <div className="h-64 bg-[var(--color-brand-cream)] flex items-center justify-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              症例写真（microCMS cases から取得予定）
            </p>
          </div>
          <div className="text-center mt-8">
            <a
              href="/case"
              className="inline-block border border-[var(--color-brand-dark)] px-8 py-3 text-sm tracking-wider text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white transition-colors"
            >
              症例一覧を見る
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Media */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-cream)]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Media
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              メディア掲載
            </h2>
          </div>
          <div className="h-32 bg-white flex items-center justify-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              メディア実績（doctor スキーマから取得予定）
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: クリニック内観① - parallax */}
      <ParallaxImage
        src="/toppage/clinicimage01.jpg"
        alt="Maison PUREJU クリニック内観"
      />

      {/* Section 8: Value - 選ばれる理由 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              選ばれる理由
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "形成外科専門医", desc: "高い技術と豊富な知識を持つ専門医が担当" },
              { title: "完全個室", desc: "プライバシーに配慮した完全個室の診療環境" },
              { title: "銀座", desc: "アクセス便利な銀座の一等地に位置するクリニック" },
              { title: "こだわりの技術", desc: "一人ひとりに合わせたオーダーメイドの施術" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-12 h-12 border border-[var(--color-brand-gold)] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[var(--color-brand-dark)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Doctor Message */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-cream)]">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-80 bg-[var(--color-brand-brown)] flex items-center justify-center">
              <p className="text-white/50 text-sm">院長写真</p>
            </div>
            <div>
              <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-4">
                Message from Doctor
              </p>
              <h2 className="text-2xl font-light text-[var(--color-brand-dark)] mb-6">
                院長からのメッセージ
              </h2>
              <div className="h-32 bg-[var(--color-brand-cream)]/50 flex items-center justify-center">
                <p className="text-[var(--color-text-secondary)] text-sm">
                  メッセージ（microCMS doctor から取得予定）
                </p>
              </div>
              <a
                href="/doctor"
                className="inline-block mt-6 text-sm text-[var(--color-brand-gold)] border-b border-[var(--color-brand-gold)] pb-0.5 hover:opacity-70 transition-opacity"
              >
                院長プロフィールを見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Team Slide */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="section-container mb-10">
          <div className="text-center">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Our Team
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)] mb-4">
              Introduction of our Team
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
              豊富な経験を持つ専門医・スタッフが、あなたの理想に向き合います。
            </p>
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-64 bg-[var(--color-brand-cream)]"
            />
          ))}
        </div>
      </section>

      {/* Section 11: News */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-cream)]">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
                News
              </p>
              <h2 className="text-2xl font-light text-[var(--color-brand-dark)]">
                お知らせ
              </h2>
            </div>
            <a
              href="/news"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand-gold)] transition-colors"
            >
              一覧を見る →
            </a>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 bg-white">
                <span className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                  2026.01.0{i}
                </span>
                <span className="text-sm text-[var(--color-text-primary)]">
                  お知らせタイトル（microCMS連携予定）
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Media（SNS） */}
      <MediaSectionPlaceholder />

      {/* Section 13: クリニック内観② - parallax */}
      <ParallaxImage
        src="/toppage/clinicimage02.jpg"
        alt="Maison PUREJU クリニック処置室"
      />

      {/* Section 14: Access */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-2">
              Access
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-brand-dark)]">
              アクセス
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-64 bg-[var(--color-brand-cream)] flex items-center justify-center">
              <p className="text-[var(--color-text-secondary)] text-sm">Googleマップ埋め込み</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[var(--color-brand-gold)] tracking-wider mb-1">ADDRESS</p>
                <p className="text-sm text-[var(--color-text-primary)]">〒104-0061 東京都中央区銀座○-○-○</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-brand-gold)] tracking-wider mb-1">ACCESS</p>
                <p className="text-sm text-[var(--color-text-primary)]">東京メトロ銀座線「銀座」駅 徒歩○分</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-brand-gold)] tracking-wider mb-1">HOURS</p>
                <p className="text-sm text-[var(--color-text-primary)]">10:00 〜 19:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Reserve CTA */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-dark)]">
        <div className="section-container text-center">
          <p className="font-en text-xs tracking-[0.3em] text-[var(--color-brand-gold)] mb-4">
            Reservation
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white mb-8">
            まずはカウンセリングから
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://lin.ee/maisonpureju"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-[#06C755] text-white font-medium tracking-wider hover:opacity-90 transition-opacity"
            >
              LINE相談
            </a>
            <a
              href="https://mpureju.com/reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-[var(--color-brand-gold)] text-white font-medium tracking-wider hover:opacity-90 transition-opacity"
            >
              Web予約
            </a>
          </div>
        </div>
      </section>

      </div>{/* /relative z-10 */}
    </>
  );
}

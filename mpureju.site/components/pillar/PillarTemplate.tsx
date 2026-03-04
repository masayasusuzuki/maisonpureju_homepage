import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { CaseCarousel } from "@/components/sections/CaseCarousel";
import { FaqAccordion, type FaqItem } from "@/components/sections/FaqAccordion";

export type Treatment = {
  name: string;
  slug: string;
  desc: string;
};

export type PillarConfig = {
  slug: string;
  label: string;       // "口元"
  labelEn: string;     // "Mouth & Lips"
  tagline: string;
  heroImage: string;
  concerns: string[];
  treatments: Treatment[];
  faqs: FaqItem[];
  caseCategory: string;
};

export function PillarTemplate({ config }: { config: PillarConfig }) {
  return (
    <>
      {/* Hero */}
      <section
        className="-mt-16 md:-mt-20 relative overflow-hidden"
        style={{ height: "clamp(400px, 65vh, 700px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-16">
          <div className="section-container">
            {/* パンくず */}
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-8 tracking-wider">
              <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-white/80">{config.label}</span>
            </nav>

            <p className="font-en text-sm tracking-[0.3em] text-[var(--color-brand-gold)] mb-3">
              {config.labelEn}
            </p>
            <h1 className="font-en text-5xl md:text-6xl lg:text-7xl tracking-widest text-white mb-5 leading-none">
              {config.label}
            </h1>
            <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed max-w-md">
              {config.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://mpureju.com/reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[var(--color-brand-gold)] text-white text-sm tracking-wider px-7 py-3 hover:opacity-90 transition-opacity"
              >
                無料カウンセリング予約
              </a>
              <a
                href="https://lin.ee/maisonpureju"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/60 text-white text-sm tracking-wider px-7 py-3 hover:bg-white/10 transition-colors"
              >
                LINEで相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* お悩みから選ぶ */}
      <section className="py-8 bg-[var(--color-brand-cream)]">
        <div className="section-container">
          <p className="text-xs tracking-[0.25em] text-[var(--color-brand-gold)] mb-4">CONCERNS</p>
          <div className="flex flex-wrap gap-2">
            {config.concerns.map((concern) => (
              <span
                key={concern}
                className="px-4 py-1.5 text-sm font-light text-[var(--color-text-secondary)] border border-[var(--color-brand-brown)]/20 bg-white rounded-full tracking-wide"
              >
                {concern}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 施術メニュー */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <SectionHeading en="Treatment Menu" ja="施術メニュー" className="mb-12" />
          <div className="divide-y divide-[var(--color-brand-brown)]/10">
            {config.treatments.map((t, i) => (
              <ScrollFadeIn key={t.name} delay={i * 0.04}>
                <Link
                  href={`/${config.slug}/${t.slug}`}
                  className="group flex flex-col sm:flex-row overflow-hidden hover:bg-[var(--color-brand-cream)]/40 transition-colors duration-200"
                >
                  {/* 画像 */}
                  <div className="relative bg-[var(--color-brand-cream)] w-full sm:w-52 lg:w-64 shrink-0 aspect-[4/3]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[var(--color-text-secondary)]/30 text-xs tracking-[0.25em]">
                        PHOTO
                      </span>
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className="flex flex-col justify-center px-6 py-5 sm:py-6">
                    <h3 className="font-serif text-base md:text-lg text-[var(--color-brand-dark)] mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-light leading-relaxed mb-4 max-w-xl">
                      {t.desc}
                    </p>
                    <span className="text-xs tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-brand-gold)] transition-colors">
                      詳しく見る →
                    </span>
                  </div>
                </Link>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 症例実績 */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-cream)] overflow-hidden">
        <div className="section-container mb-10">
          <SectionHeading en="Case Results" ja="症例実績" />
        </div>
        <CaseCarousel defaultCategory={config.caseCategory} />
        <div className="text-center mt-10">
          <Link
            href="/case"
            className="inline-block border border-[var(--color-brand-dark)] px-8 py-3 text-sm tracking-wider text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white transition-colors"
          >
            症例一覧を見る
          </Link>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <SectionHeading en="FAQ" ja="よくある質問" className="mb-12" />
          <div className="max-w-3xl">
            <FaqAccordion items={config.faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--color-brand-dark)]">
        <div className="section-container text-center">
          <p className="font-en text-xs tracking-[0.35em] text-[var(--color-brand-gold)]/70 mb-4">
            CONSULTATION
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-relaxed">
            まずは無料カウンセリングへ
          </h2>
          <p className="text-sm text-white/60 font-light mb-10 leading-relaxed">
            院長が丁寧にご相談をお伺いし、<br className="sm:hidden" />あなたに最適なプランをご提案いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mpureju.com/reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-brand-gold)] text-white text-sm tracking-wider px-10 py-4 hover:opacity-90 transition-opacity"
            >
              無料カウンセリングを予約する
            </a>
            <a
              href="https://lin.ee/maisonpureju"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 text-white text-sm tracking-wider px-10 py-4 hover:border-white/60 hover:bg-white/5 transition-all"
            >
              LINEで気軽に相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

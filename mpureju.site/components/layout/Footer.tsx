import Link from "next/link";

const col1Links = [
  { label: "News", href: "/news" },
  { label: "Doctor", href: "/doctor" },
  { label: "Price", href: "/price" },
  { label: "Case", href: "/case" },
  { label: "Access", href: "/about#access" },
  { label: "Column", href: "/column" },
  { label: "Simulator", href: "/simulator" },
];

const concernLinks = [
  { label: "口元が気になる", href: "/mouth" },
  { label: "目元を変えたい", href: "/eye" },
  { label: "鼻を整えたい", href: "/nose" },
  { label: "たるみ・リフト", href: "/lift" },
  { label: "肌トラブル", href: "/skin" },
];

const treatmentLinks = [
  { label: "口元の施術", href: "/mouth" },
  { label: "目元の施術", href: "/eye" },
  { label: "鼻の施術", href: "/nose" },
  { label: "リフトアップ", href: "/lift" },
  { label: "美容皮膚科", href: "/skin" },
];

const col3Links = [
  { label: "Faq", href: "/column/faq" },
  { label: "Reservation", href: "https://mpureju.com/reservation", external: true },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "医療広告ガイドライン", href: "/medical-guidelines" },
  { label: "キャンセルポリシーについて", href: "/cancel-policy" },
  { label: "特定商取引法に基づく表示", href: "/legal" },
];

const snsLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/maisonpureju",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@maisonpureju",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/maisonpureju",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LINE",
    href: "https://lin.ee/maisonpureju",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-white/80">
      {/* Main grid */}
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-12 md:gap-8">

          {/* Col 1 - Primary nav */}
          <nav className="space-y-1">
            {col1Links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="font-en text-2xl md:text-3xl font-light tracking-wide text-white/90 hover:text-[var(--color-brand-gold)] transition-colors block py-1"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Col 2 - Menu */}
          <div>
            <p className="font-en text-2xl md:text-3xl font-light tracking-wide text-white/90 mb-6">
              Menu
            </p>

            <div className="grid grid-cols-2 gap-x-6">
              {/* お悩みから探す */}
              <div>
                <p className="text-xs text-white/50 mb-2 tracking-wider">お悩みから探す</p>
                <div className="border-t border-white/20 mb-3" />
                <nav>
                  {concernLinks.map((link) => (
                    <div key={link.href} className="border-b border-white/10">
                      <Link
                        href={link.href}
                        className="block py-2.5 text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>

              {/* 施術から探す */}
              <div>
                <p className="text-xs text-white/50 mb-2 tracking-wider">施術から探す</p>
                <div className="border-t border-white/20 mb-3" />
                <nav>
                  {treatmentLinks.map((link) => (
                    <div key={link.href} className="border-b border-white/10">
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-2.5 text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                        <span className="text-white/40">＋</span>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* すべての施術一覧ボタン */}
            <Link
              href="/treatment"
              className="mt-6 block w-full py-3 text-center text-sm text-white/80 bg-white/10 hover:bg-white/20 transition-colors tracking-wider"
            >
              すべての施術一覧
            </Link>
          </div>

          {/* Col 3 - CTA + Legal + SNS */}
          <div>
            {/* Primary links */}
            <nav className="space-y-1 mb-8">
              {col3Links.map((link) => (
                <div key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-en text-2xl md:text-3xl font-light tracking-wide text-white/90 hover:text-[var(--color-brand-gold)] transition-colors block py-1"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-en text-2xl md:text-3xl font-light tracking-wide text-white/90 hover:text-[var(--color-brand-gold)] transition-colors block py-1"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Legal links */}
            <nav className="space-y-2 mb-8">
              {legalLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* SNS icons */}
            <div className="flex items-center gap-4">
              {snsLinks.map((sns) => (
                <a
                  key={sns.label}
                  href={sns.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sns.label}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Logo + Address */}
            <div className="flex items-start gap-6">
              <p className="font-en text-xl tracking-widest text-white/90 shrink-0">
                Maison<br />PUREJU
              </p>
              <div>
                <p className="text-xs text-white/50 leading-relaxed">
                  〒104-0061 東京都中央区銀座○-○-○
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 underline hover:text-white/70 transition-colors"
                >
                  Google Maps
                </a>
              </div>
            </div>

            {/* Phone + LINE CTAs */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <a
                  href="tel:0312345678"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  03-XXXX-XXXX
                </a>
                <a
                  href="https://lin.ee/maisonpureju"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINEでのご予約
                </a>
              </div>
              <p className="text-xs text-white/35 text-right">
                受付時間　10:00〜19:00 / 不定休
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-xs text-white/25 text-center md:text-left">
            © {new Date().getFullYear()} Maison PUREJU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

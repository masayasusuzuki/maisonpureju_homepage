import React from "react";
import Image from "next/image";

type Education = {
  schoolName: string;
  department: string;
  graduationYear: string;
  graduationMonth: string;
};

type WorkHistory = {
  companyName: string;
  jobTitle: string;
  periodFrom: string;
  periodTo: string;
  isCurrent: boolean;
  description: string;
};

function parseYM(ym: string): string {
  const parts = ym?.split("-") ?? [];
  if (!parts[0]) return "";
  return `${parts[0]}年${(parts[1] ?? "").replace(/^0/, "")}月`;
}

function calcAge(birthDate: string): number | null {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const B  = "border border-gray-200";
const TH = `${B} bg-gray-50/80 text-left text-[11px] px-3 py-2.5 font-medium text-gray-500 tracking-wider`;
const TD = `${B} text-[12px] px-3 py-2.5 text-gray-800`;
const LABEL = `${B} bg-gray-50/80 text-[11px] text-gray-400 px-3 py-2.5 font-medium tracking-wide`;

const POSITION_LABEL: Record<string, string> = {
  nurse:        "看護師",
  receptionist: "受付カウンセラー",
  "pr-creator": "広報／SNSクリエイター",
};

export function ResumeView({ data }: { data: Record<string, unknown> }) {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日現在`;

  const education:   Education[]   = Array.isArray(data.education)    ? (data.education as Education[])       : [];
  const workHistory: WorkHistory[] = Array.isArray(data.work_history) ? (data.work_history as WorkHistory[]) : [];

  const birthDate = data.birth_date as string | null;
  let birthStr = "";
  if (birthDate) {
    const [y, m, d] = birthDate.split("-");
    const age = calcAge(birthDate);
    birthStr = `${y}年${parseInt(m)}月${parseInt(d)}日生（満${age ?? ""}歳）`;
  }

  const fullAddress = [
    data.postal_code ? `〒${data.postal_code}` : "",
    data.prefecture as string ?? "",
    data.address as string ?? "",
    data.address_building as string ?? "",
  ].filter(Boolean).join(" ");

  const qualLines = ((data.qualifications as string) ?? "")
    .split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 12mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          /* サイドバー・ナビ非表示 */
          aside, nav { display: none !important; }
          main { padding: 0 !important; }
          /* 全幅使用 */
          .resume-root { width: 100% !important; font-size: 10.5px !important; }
          /* 2カラム → 1カラム */
          .resume-columns { flex-direction: column !important; gap: 8px !important; }
          .resume-columns > div { width: 100% !important; }
          /* スクロール解除 */
          .resume-text-box { max-height: none !important; overflow: visible !important; }
          /* 個人情報テーブルの固定幅解除 */
          .resume-photo { width: 80px !important; height: 106px !important; }
        }
      `}</style>

      <div
        className="resume-root bg-white text-gray-900 mx-auto px-12 py-8 rounded-lg border border-gray-200"
        style={{ maxWidth: "960px", fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        {/* ── ヘッダー ── */}
        <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-gray-200">
          <h1 className="text-gray-800" style={{ fontSize: "20px", letterSpacing: "0.6em", fontWeight: 600 }}>履　歴　書</h1>
          <span className="text-xs text-gray-400">{dateStr}</span>
        </div>

        {/* ══════════════════════════════════════════
            個人情報（全幅）
            ══════════════════════════════════════════ */}
        <div className="flex gap-5 mb-5">
          {/* 写真 */}
          <div className="flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ width: "110px", height: "140px" }}>
            {data.photo_url ? (
              <div className="relative w-full h-full">
                <Image src={data.photo_url as string} alt="顔写真" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                写真なし
              </div>
            )}
          </div>

          {/* 基本情報テーブル */}
          <table className="flex-1 border-collapse" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "90px" }} />
              <col />
              <col style={{ width: "60px" }} />
              <col style={{ width: "180px" }} />
            </colgroup>
            <tbody>
              <tr>
                <td className={LABEL}>ふりがな</td>
                <td className={TD} colSpan={3}>{data.furigana as string}</td>
              </tr>
              <tr>
                <td className={LABEL}>氏　名</td>
                <td className={`${B} px-3 py-3 font-bold`} style={{ fontSize: "18px", letterSpacing: "0.08em" }} colSpan={3}>
                  {data.name as string}
                </td>
              </tr>
              <tr>
                <td className={LABEL}>生年月日</td>
                <td className={TD}>{birthStr}</td>
                <td className={LABEL}>性別</td>
                <td className={TD}>{String(data.gender ?? "")}</td>
              </tr>
              <tr>
                <td className={LABEL}>現住所</td>
                <td className={TD} colSpan={3} style={{ fontSize: "12px" }}>{fullAddress}</td>
              </tr>
              <tr>
                <td className={LABEL}>E-mail</td>
                <td className={TD}>{data.email as string}</td>
                <td className={LABEL}>電　話</td>
                <td className={TD}>{data.phone as string}</td>
              </tr>
              <tr>
                <td className={LABEL}>応募職種</td>
                <td className={`${TD} font-medium`} colSpan={3}>
                  {POSITION_LABEL[data.position as string] ?? String(data.position)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ══════════════════════════════════════════
            2カラム
            ══════════════════════════════════════════ */}
        <div className="resume-columns flex flex-col gap-4">

            {/* 学歴 */}
            <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "48px" }} />
                <col style={{ width: "34px" }} />
                <col />
              </colgroup>
              <thead>
                <tr><th className={TH}>年</th><th className={TH}>月</th><th className={TH}>学　歴</th></tr>
              </thead>
              <tbody>
                {education.map((e, i) => (
                  <tr key={i}>
                    <td className={`${B} text-center text-xs py-1.5`}>{e.graduationYear}</td>
                    <td className={`${B} text-center text-xs py-1.5`}>{e.graduationMonth}</td>
                    <td className={TD}>{[e.schoolName, e.department].filter(Boolean).join("　")}　卒業</td>
                  </tr>
                ))}
                {education.length === 0 && (
                  <tr><td className={`${B} py-1.5`}></td><td className={`${B} py-1.5`}></td><td className={`${TD} text-gray-400`}>なし</td></tr>
                )}
              </tbody>
            </table>

            {/* 免許・資格 */}
            <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "48px" }} />
                <col style={{ width: "34px" }} />
                <col />
              </colgroup>
              <thead>
                <tr><th className={TH}>年</th><th className={TH}>月</th><th className={TH}>免　許・資　格</th></tr>
              </thead>
              <tbody>
                {qualLines.length === 0 ? (
                  <tr><td className={`${B} py-1.5`}></td><td className={`${B} py-1.5`}></td><td className={`${TD} text-gray-400`}>なし</td></tr>
                ) : qualLines.map((line, i) => (
                  <tr key={i}>
                    <td className={`${B} py-1.5`}></td>
                    <td className={`${B} py-1.5`}></td>
                    <td className={TD}>{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 職歴 */}
            <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "48px" }} />
                <col style={{ width: "34px" }} />
                <col />
              </colgroup>
              <thead>
                <tr><th className={TH}>年</th><th className={TH}>月</th><th className={TH}>職　歴</th></tr>
              </thead>
              <tbody>
                {workHistory.length === 0 && (
                  <tr><td className={`${B} py-1.5`}></td><td className={`${B} py-1.5`}></td><td className={`${TD} text-gray-400`}>なし</td></tr>
                )}
                {workHistory.map((w, i) => {
                  const from = w.periodFrom?.split("-") ?? [];
                  const fromStr = parseYM(w.periodFrom);
                  const toStr   = w.isCurrent ? "現在" : parseYM(w.periodTo);
                  return (
                    <React.Fragment key={i}>
                      <tr>
                        <td className={`${B} text-center text-xs py-1.5`}>{from[0] ?? ""}</td>
                        <td className={`${B} text-center text-xs py-1.5`}>{(from[1] ?? "").replace(/^0/, "")}</td>
                        <td className={`${TD} font-medium`}>
                          {[w.companyName, w.jobTitle].filter(Boolean).join("　")}
                        </td>
                      </tr>
                      {(fromStr || toStr) && (
                        <tr>
                          <td className={`${B} py-1`}></td>
                          <td className={`${B} py-1`}></td>
                          <td className={`${TD} text-gray-500`}>{fromStr} 〜 {toStr}</td>
                        </tr>
                      )}
                      {w.description && (
                        <tr>
                          <td className={`${B} py-1`}></td>
                          <td className={`${B} py-1`}></td>
                          <td className={`${TD} text-gray-700 leading-relaxed`}>{w.description}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {/* 志望動機 */}
            {!!data.motivation && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50/80 text-[11px] text-gray-400 font-medium px-4 py-2 border-b border-gray-200 tracking-wide">
                  志望動機
                </div>
                <div className="px-4 py-3 text-[12px] text-gray-800 leading-[1.8] whitespace-pre-wrap resume-text-box overflow-y-auto" style={{ maxHeight: "180px" }}>
                  {String(data.motivation)}
                </div>
              </div>
            )}

            {/* 自己PR */}
            {!!data.self_pr && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50/80 text-[11px] text-gray-400 font-medium px-4 py-2 border-b border-gray-200 tracking-wide">
                  自己PR・アピールポイント
                </div>
                <div className="px-4 py-3 text-[12px] text-gray-800 leading-[1.8] whitespace-pre-wrap resume-text-box overflow-y-auto" style={{ maxHeight: "180px" }}>
                  {String(data.self_pr)}
                </div>
              </div>
            )}

            {/* 希望条件 */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 text-[11px] text-gray-400 font-medium px-4 py-2 border-b border-gray-200 tracking-wide">
                希望条件
              </div>
              <div className="px-4 py-3 text-[12px] text-gray-800 leading-[1.8] space-y-1 resume-text-box overflow-y-auto" style={{ maxHeight: "140px" }}>
                {!!data.work_style && <p>{String(data.work_style)}</p>}
                {!!data.desired_salary && <p>希望給与：{String(data.desired_salary)}</p>}
                {!!data.portfolio_url && (
                  <p>
                    ポートフォリオ：
                    <a href={String(data.portfolio_url)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                      {String(data.portfolio_url)}
                    </a>
                  </p>
                )}
                {!data.work_style && !data.desired_salary && !data.portfolio_url && (
                  <p className="text-gray-400">貴社の規定に従います。</p>
                )}
              </div>
            </div>

        </div>
      </div>
    </>
  );
}

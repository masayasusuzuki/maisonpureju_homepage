import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const POSITION_LABEL: Record<string, string> = {
  nurse: "看護師",
  receptionist: "受付カウンセラー",
  "pr-creator": "広報/SNSクリエイター",
};

const SCORING_NURSE = `
## 採点基準（100点満点）
1. 写真（10点）: 清潔感、背景が整っているか、服装（スーツ推奨、私服は大幅減点）、表情、撮影環境
2. 年齢（10点）: 20代は満点、30代前半は7〜8点、30代後半は5点、40代以上は3点以下
3. 学歴（10点）: 大学ランク重視（早慶上智=10点、MARCH=8点、日東駒専=6点、私立Fランク=2〜3点、専門卒=5点、高卒=3点）。専攻の関連性も加味
4. 職歴（20点）: 在籍期間の長さ、転職回数（多いほど減点）、美容医療業界の経験、キャリアの一貫性
5. 志望動機（20点）: 具体性、当クリニックへの理解度、熱意、他社にも使い回せる汎用的な内容は減点
6. 自己PR（15点）: 実績の具体性、数値根拠、職種との適性、差別化要素
7. 資格・免許（10点）: 看護師免許必須（なければ0点）、その他関連資格の充実度
8. 書類の丁寧さ（5点）: 誤字脱字、空欄の多さ、記述量のバランス`;

const SCORING_CREATOR = `
## 採点基準（100点満点）
1. 写真（10点）: 清潔感、背景が整っているか、服装（スーツ推奨、私服は大幅減点）、表情、撮影環境
2. 年齢（5点）: 20代は満点、30代前半は4点、30代後半は3点、40代以上は1〜2点。クリエイターは経験重視のため年齢の減点は緩め
3. 学歴（5点）: 大学ランク重視（早慶上智=5点、MARCH=4点、日東駒専=3点、私立Fランク=1点、専門卒=3点、高卒=2点）。専攻の関連性も加味
4. 職歴（20点）: 在籍期間の長さ、転職回数（多いほど減点）、SNS/広報/クリエイティブ業界の経験、キャリアの一貫性
5. 志望動機（15点）: 具体性、当クリニックへの理解度、熱意、他社にも使い回せる汎用的な内容は減点
6. 自己PR（25点）: 実績の具体性、数値根拠（フォロワー数・再生数等）、職種との適性、差別化要素
7. 資格・免許（5点）: 関連資格の有無（なくても実績があれば減点は軽微）
8. 書類の丁寧さ（15点）: 誤字脱字、空欄の多さ、記述量のバランス、文章の表現力・構成力`;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseAdminClient();

  const { data, error: fetchError } = await supabase
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !data) {
    return NextResponse.json({ error: "応募データが見つかりません" }, { status: 404 });
  }

  if (data.ai_analysis) {
    return NextResponse.json({ analysis: data.ai_analysis });
  }

  const profile = [
    `応募職種: ${POSITION_LABEL[data.position] ?? data.position}`,
    `氏名: ${data.name}`,
    data.birth_date ? `生年月日: ${data.birth_date}` : null,
    data.education ? `学歴: ${JSON.stringify(data.education)}` : null,
    data.work_history ? `職歴: ${JSON.stringify(data.work_history)}` : null,
    data.qualifications ? `資格・免許: ${data.qualifications}` : null,
    data.motivation ? `志望動機: ${data.motivation}` : null,
    data.self_pr ? `自己PR: ${data.self_pr}` : null,
    data.work_style ? `希望条件: ${data.work_style}` : null,
    data.portfolio_url ? `ポートフォリオ: ${data.portfolio_url}` : null,
  ].filter(Boolean).join("\n");

  const scoring = data.position === "pr-creator" ? SCORING_CREATOR : SCORING_NURSE;

  // 写真パーツ（Gemini マルチモーダル）
  const contentParts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = [];

  if (data.photo_url) {
    try {
      const imgRes = await fetch(data.photo_url as string);
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer();
        const base64 = Buffer.from(buf).toString("base64");
        const mime = imgRes.headers.get("content-type") ?? "image/jpeg";
        contentParts.push({ inline_data: { mime_type: mime, data: base64 } });
      }
    } catch {
      // 写真取得失敗時はテキストのみで分析
    }
  }

  contentParts.push({
    text: `以下の応募者を採点・分析してください。${data.photo_url ? "添付画像は応募者の顔写真です。写真の評価に使ってください。" : "写真は未提出です。写真の項目は0点としてください。"}\n\n${profile}`,
  });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY が未設定です" }, { status: 500 });
  }

  const systemPrompt = `あなたは美容クリニック「Maison PUREJU（銀座）」の採用担当AIです。
応募者の情報を【辛口基準】で厳格に採点してください。甘い評価は禁止です。

${scoring}

## 出力フォーマット（必ずこの形式で出力）

\`\`\`json
{
  "scores": {
    "photo": { "score": 0, "max": 10, "comment": "..." },
    "age": { "score": 0, "max": 10, "comment": "..." },
    "education": { "score": 0, "max": 10, "comment": "..." },
    "career": { "score": 0, "max": 20, "comment": "..." },
    "motivation": { "score": 0, "max": 20, "comment": "..." },
    "self_pr": { "score": 0, "max": 15, "comment": "..." },
    "qualification": { "score": 0, "max": 10, "comment": "..." },
    "document_quality": { "score": 0, "max": 5, "comment": "..." }
  },
  "total": 0,
  "ai_suspicion": {
    "flagged": false,
    "reason": ""
  },
  "summary": "応募者の全体像、採用判断に対する所見を3〜4文で。結論（面接推奨/見送り推奨等）を明確に述べる",
  "negatives": ["採用にデメリットとなるネガティブ要素を箇条書きで", "..."]
}
\`\`\`

注: maxの値は応募職種に応じた配点を使うこと（上記はサンプル値）

## 重要ルール
- 各項目のmaxは応募職種に応じた配点を使うこと
- 辛口に採点すること。平均的な応募書類で50〜60点程度が目安
- commentは1〜2文で簡潔に。良い点と改善点の両方を含めること
- summary: 応募者の全体像と採用判断への所見を3〜4文で述べる。「面接推奨」「見送り推奨」等の結論を明確に含めること
- negatives: 採用するうえでデメリットとなるネガティブ要素のみを箇条書きで列挙。ポジティブ要素は一切不要。懸念がなければ空配列
- ai_suspicion: 志望動機・自己PRがAI生成の疑いがある場合は flagged: true にし、理由を記載。判断基準: 不自然に整いすぎた文体、テンプレート的表現、具体的エピソードの欠如、文体の均一さ
- JSONのみを出力。前後に余計な文章を付けないこと`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: contentParts }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Gemini API error:", errBody);
      return NextResponse.json({ error: "AI分析に失敗しました" }, { status: 500 });
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!rawText) {
      return NextResponse.json({ error: "AI分析結果が空でした" }, { status: 500 });
    }

    // JSONブロックを抽出
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/) ?? rawText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? (jsonMatch[1] ?? jsonMatch[0]).trim() : rawText;

    // JSONとしてパースできるか検証
    try {
      JSON.parse(analysis);
    } catch {
      console.error("AI output is not valid JSON:", analysis);
      // そのまま保存（UIでフォールバック表示）
    }

    const { error: updateError } = await supabase
      .from("job_applications")
      .update({ ai_analysis: analysis })
      .eq("id", id);

    if (updateError) {
      console.error("ai_analysis save error:", updateError);
    }

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "AI分析に失敗しました" }, { status: 500 });
  }
}

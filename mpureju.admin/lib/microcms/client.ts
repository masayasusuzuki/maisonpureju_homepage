/**
 * microCMS Write API クライアント
 * サーバーサイド専用（API Key はサーバーでのみ使用）
 */

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN!;
const API_KEY = process.env.MICROCMS_API_KEY!;

function baseUrl(endpoint: string) {
  return `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`;
}

function headers(extra?: Record<string, string>) {
  return {
    "X-MICROCMS-API-KEY": API_KEY,
    "Content-Type": "application/json",
    ...extra,
  };
}

// ── GET（一覧） ──────────────────────────────────
export async function listContents<T = Record<string, unknown>>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<{ contents: T[]; totalCount: number }> {
  const url = new URL(baseUrl(endpoint));
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`microCMS GET ${endpoint}: ${res.status}`);
  return res.json();
}

// ── GET（単一） ──────────────────────────────────
export async function getContent<T = Record<string, unknown>>(
  endpoint: string,
  contentId: string,
): Promise<T> {
  const res = await fetch(`${baseUrl(endpoint)}/${contentId}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`microCMS GET ${endpoint}/${contentId}: ${res.status}`);
  return res.json();
}

// ── POST（作成） ─────────────────────────────────
export async function createContent(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<{ id: string }> {
  const res = await fetch(baseUrl(endpoint), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`microCMS POST ${endpoint}: ${res.status} – ${text}`);
  }
  return res.json();
}

// ── PUT（ID指定で作成 or 上書き） ────────────────
export async function putContent(
  endpoint: string,
  contentId: string,
  body: Record<string, unknown>,
): Promise<{ id: string }> {
  const res = await fetch(`${baseUrl(endpoint)}/${contentId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`microCMS PUT ${endpoint}/${contentId}: ${res.status} – ${text}`);
  }
  return res.json();
}

// ── PATCH（部分更新） ────────────────────────────
export async function patchContent(
  endpoint: string,
  contentId: string,
  body: Record<string, unknown>,
): Promise<{ id: string }> {
  const res = await fetch(`${baseUrl(endpoint)}/${contentId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`microCMS PATCH ${endpoint}/${contentId}: ${res.status} – ${text}`);
  }
  return res.json();
}

// ── DELETE ───────────────────────────────────────
export async function deleteContent(
  endpoint: string,
  contentId: string,
): Promise<void> {
  const res = await fetch(`${baseUrl(endpoint)}/${contentId}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`microCMS DELETE ${endpoint}/${contentId}: ${res.status} – ${text}`);
  }
}

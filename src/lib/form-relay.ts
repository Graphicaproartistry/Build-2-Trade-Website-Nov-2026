import { after } from "next/server";
import { site } from "@/content/site";

/**
 * Sends a form submission by email through FormSubmit, from our own server (same site
 * for the browser, so ad blockers and browser security checks can't block or slow it).
 *
 * The visitor never waits long: if FormSubmit hasn't answered within WAIT_MS, we reply
 * "sent" straight away and let delivery finish in the background.
 */
const WAIT_MS = 4000;
const TIMEOUT_MS = 25000;

// CONTACT_FORM_ENDPOINT can point somewhere else (e.g. a test server); defaults to FormSubmit.
const endpoint = () => process.env.CONTACT_FORM_ENDPOINT || site.contact.formEndpoint;

export const clip = (v: unknown, max: number) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

type Result = { ok: boolean; activation?: boolean; message?: string };

async function forward(payload: Record<string, string>, page: string): Promise<Result> {
  try {
    const res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit ties the form to the website it's used on.
        Origin: site.url,
        Referer: `${site.url}${page}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
    };
    if (res.ok && String(data.success) !== "false") return { ok: true };
    const message = data.message ?? `FormSubmit error ${res.status}`;
    return { ok: false, activation: /activat/i.test(message), message };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Network error" };
  }
}

/** Forward the fields and answer the browser within a few seconds at most. */
export async function relay(payload: Record<string, string>, page: string, label: string) {
  const delivery = forward({ _template: "table", _captcha: "false", ...payload }, page);

  const early = await Promise.race([
    delivery,
    new Promise<null>((r) => setTimeout(() => r(null), WAIT_MS)),
  ]);
  if (early) return Response.json(early, { status: early.ok ? 200 : 502 });

  // Still going: tell the visitor it's on its way and finish in the background.
  after(async () => {
    const r = await delivery;
    if (!r.ok) console.error(`${label} delivery failed:`, r.message);
  });
  return Response.json({ ok: true, queued: true });
}

import { after } from "next/server";
import { site } from "@/content/site";

/**
 * Contact form relay. The browser posts here (same site, so ad blockers and browser
 * security checks can't block or slow it) and the server forwards the enquiry to
 * FormSubmit, which emails it to the support inbox.
 *
 * The visitor never waits long: if FormSubmit hasn't answered within WAIT_MS, we reply
 * "sent" straight away and let delivery finish in the background.
 */
const WAIT_MS = 4000;
const TIMEOUT_MS = 25000;

// CONTACT_FORM_ENDPOINT can point somewhere else (e.g. a test server); defaults to FormSubmit.
const endpoint = () => process.env.CONTACT_FORM_ENDPOINT || site.contact.formEndpoint;

const clip = (v: unknown, max: number) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

type Result = { ok: boolean; activation?: boolean; message?: string };

async function forward(payload: Record<string, string>): Promise<Result> {
  try {
    const res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit ties the form to the website it's used on.
        Origin: site.url,
        Referer: `${site.url}/contact`,
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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false, message: "Invalid request" }, { status: 400 });

  // Spam trap: bots fill hidden fields. Pretend it worked.
  if (clip(body._honey, 200)) return Response.json({ ok: true });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const message = clip(body.message, 5000);
  const role = clip(body.role, 40) || "Other";
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { ok: false, message: "Please fill in your name, a valid email and a message." },
      { status: 400 },
    );
  }

  const delivery = forward({
    name,
    email,
    phone: clip(body.phone, 40) || "-",
    "I am a": role,
    message,
    _subject: `Website enquiry from ${name} (${role})`,
    _replyto: email,
    _template: "table",
    _captcha: "false",
  });

  const early = await Promise.race([
    delivery,
    new Promise<null>((r) => setTimeout(() => r(null), WAIT_MS)),
  ]);
  if (early) return Response.json(early, { status: early.ok ? 200 : 502 });

  // Still going: tell the visitor it's on its way and finish in the background.
  after(async () => {
    const r = await delivery;
    if (!r.ok) console.error("Contact form delivery failed:", r.message);
  });
  return Response.json({ ok: true, queued: true });
}

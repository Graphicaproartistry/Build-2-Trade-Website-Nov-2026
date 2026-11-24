import { clip, relay } from "@/lib/form-relay";

/** Contact form: emailed to the support inbox through FormSubmit (see lib/form-relay). */
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

  return relay(
    {
      name,
      email,
      phone: clip(body.phone, 40) || "-",
      "I am a": role,
      message,
      _subject: `Website enquiry from ${name} (${role})`,
      _replyto: email,
    },
    "/contact",
    "Contact form",
  );
}

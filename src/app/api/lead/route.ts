import { clip, relay } from "@/lib/form-relay";

/** Expo lead capture form (/expo): emailed to the support inbox through FormSubmit. */
const ROLES = ["Builder", "Tradie", "Supplier", "Other"];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false, message: "Invalid request" }, { status: 400 });

  // Spam trap: bots fill hidden fields. Pretend it worked.
  if (clip(body._honey, 200)) return Response.json({ ok: true });

  const name = clip(body.name, 120);
  const phone = clip(body.phone, 40);
  const role = ROLES.includes(clip(body.role, 20)) ? clip(body.role, 20) : "";
  const other = clip(body.other, 200);
  const digits = phone.replace(/\D/g, "");
  if (!name || digits.length < 8 || !role || (role === "Other" && !other)) {
    return Response.json(
      { ok: false, message: "Please fill in your name, phone number and what you do." },
      { status: 400 },
    );
  }

  const trade = clip(body.trade, 80);
  if (role === "Tradie" && !trade) {
    return Response.json({ ok: false, message: "Please choose your trade type." }, { status: 400 });
  }
  if (body.consent !== true) {
    return Response.json(
      { ok: false, message: "Please tick the box to agree to be contacted." },
      { status: 400 },
    );
  }
  const email = clip(body.email, 200);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const what = role === "Other" ? `Other: ${other}` : role;
  return relay(
    {
      "Full name": name,
      Number: phone,
      "Are you a": what,
      "Trade type": trade || "-",
      Email: validEmail ? email : "-",
      "Business name": clip(body.business, 120) || "-",
      Postcode: clip(body.postcode, 10) || "-",
      "Agreed to be contacted": "Yes",
      Source: "Expo lead capture form",
      _subject: `Expo lead: ${name} (${trade ? `${what}, ${trade}` : what})`,
      ...(validEmail ? { _replyto: email } : {}),
    },
    "/expo",
    "Expo lead",
  );
}

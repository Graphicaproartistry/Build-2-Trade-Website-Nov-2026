import { clip } from "@/lib/form-relay";
import { saveLead } from "@/lib/lead-store";

/** Expo lead capture form (/expo): saved on the server and shown at /expoleads/<key>. No email. */
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, message: "Please enter a valid email." }, { status: 400 });
  }

  const what = role === "Other" ? `Other: ${other}` : role;
  const business = clip(body.business, 120);
  const postcode = clip(body.postcode, 10);

  // Expo leads are only saved for the private leads page (/expoleads/<key>); no email is
  // sent. Saving is the only record, so a failure must be reported, not hidden.
  try {
    await saveLead({
      at: new Date().toISOString(),
      name,
      phone,
      role: what,
      trade,
      email,
      business,
      postcode,
    });
  } catch (err) {
    console.error("Could not save expo lead:", err);
    return Response.json(
      { ok: false, message: "Sorry, we couldn't save that. Please show this screen to our team." },
      { status: 500 },
    );
  }
  return Response.json({ ok: true });
}

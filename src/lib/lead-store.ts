import { appendFile, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { timingSafeEqual } from "node:crypto";

/**
 * Expo leads, saved on the server as one JSON line per lead (as well as emailed).
 *
 * The file lives OUTSIDE the website's folder (by default ~/build2trade-data on the
 * Hostinger account) so redeploying the site doesn't wipe it. LEADS_DIR overrides the
 * folder. Note: hosts with a read-only or temporary disk (e.g. Vercel) can't keep it;
 * the emailed copy is still sent there.
 */
export type Lead = {
  at: string;
  name: string;
  phone: string;
  role: string;
  trade: string;
  email: string;
  business: string;
  postcode: string;
};

const file = () =>
  path.join(process.env.LEADS_DIR || path.join(homedir(), "build2trade-data"), "expo-leads.jsonl");

export async function saveLead(lead: Lead) {
  const f = file();
  await mkdir(path.dirname(f), { recursive: true });
  await appendFile(f, JSON.stringify(lead) + "\n", "utf8");
}

/** All leads, newest first. */
export async function readLeads(): Promise<Lead[]> {
  const raw = await readFile(file(), "utf8").catch(() => "");
  return raw
    .split("\n")
    .filter(Boolean)
    .flatMap((l) => {
      try {
        return [JSON.parse(l) as Lead];
      } catch {
        return [];
      }
    })
    .reverse();
}

/**
 * The leads page has no login; it opens only with the secret key set in the host's
 * environment (EXPO_LEADS_KEY). No key set means the page stays closed. The key is never
 * stored in the code, because the code repository is public.
 */
export function keyMatches(given: string) {
  const key = process.env.EXPO_LEADS_KEY ?? "";
  if (key.length < 16) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

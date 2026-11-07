import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegalBlock =
  { type: "h"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

/**
 * Parses a legal page saved from the current website (content/source/*.txt) into
 * headings, paragraphs and lists. The text itself is used word for word.
 */
export async function loadLegal(file: string) {
  "use cache"; // static text: read once at build time
  const raw = await readFile(path.join(process.cwd(), "content", "source", file), "utf8");
  const lines = raw.split("\n").map((l) => l.trim());
  const start = lines.indexOf("Get Started") + 1;
  let end = lines.findIndex((l, i) => i > start && /^Our Mission:/.test(l));
  if (end < 0) end = lines.length;
  const body = lines.slice(start, end).filter(Boolean);

  const title = body.shift() ?? "";
  let updated: string | null = null;
  const blocks: LegalBlock[] = [];
  for (const line of body) {
    if (/^Last updated/i.test(line)) {
      updated = line;
      continue;
    }
    if (line.startsWith("•")) {
      const item = line.replace(/^•\s*/, "");
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
      continue;
    }
    const isHeading = /^\d+(\.\d+)*\.?\s+\S/.test(line) && line.length < 90 && !/[.:;]$/.test(line);
    const isSchedule =
      /^SCHEDULE\b/.test(line) || (line === line.toUpperCase() && line.length < 80);
    blocks.push({ type: isHeading || isSchedule ? "h" : "p", text: line });
  }
  return { title, updated, blocks };
}

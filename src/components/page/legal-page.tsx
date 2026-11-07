import { loadLegal } from "@/lib/legal";

/** Renders a legal document (from content/source) in a readable single column. */
export async function LegalPage({ file }: { file: string }) {
  const { title, updated, blocks } = await loadLegal(file);
  return (
    <article className="px-5 pt-36 pb-24 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">{title}</h1>
        {updated && <p className="text-b2t-navy/55 mt-4 font-medium">{updated}</p>}
        <div className="text-b2t-navy/80 mt-12 space-y-4 text-[16px] leading-relaxed">
          {blocks.map((b, i) =>
            b.type === "h" ? (
              <h2 key={i} className="text-b2t-navy pt-6 text-xl font-semibold">
                {b.text}
              </h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="list-disc space-y-1.5 pl-6">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>
      </div>
    </article>
  );
}

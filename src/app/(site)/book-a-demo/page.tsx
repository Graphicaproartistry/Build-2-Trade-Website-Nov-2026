import { BookDemo } from "@/components/sections/book-demo";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/book-a-demo",
  "Book a Build2Trade Demo",
  "See how Build2Trade runs a job: posting projects, quotes, hiring, scheduling and materials. Pick a time with the Build2Trade team.",
);

export default function Page() {
  return (
    <div className="pt-24 md:pt-28">
      <BookDemo title="Book a demo." autoLoad />
      <HeadlineReveals />
    </div>
  );
}

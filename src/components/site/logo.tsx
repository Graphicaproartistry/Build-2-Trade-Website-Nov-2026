import Image from "next/image";
import { cn } from "@/lib/utils";

/** Horizontal lockup built from the official mark + wordmark SVGs. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/b2t-mark.svg"
        alt=""
        width={415}
        height={500}
        unoptimized
        className="h-9 w-auto"
        priority
      />
      {!compact && (
        <Image
          src="/brand/b2t-wordmark.svg"
          alt=""
          width={975}
          height={125}
          unoptimized
          className="h-[15px] w-auto"
          priority
        />
      )}
      <span className="sr-only">Build 2 Trade</span>
    </span>
  );
}

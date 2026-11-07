import { cn } from "@/lib/utils";

/**
 * Shows a rectangle of a larger screenshot (pixel coords), scaled to fill the box.
 * The box keeps the crop's aspect ratio.
 */
export function Crop({
  src,
  img,
  rect,
  className,
  alt,
}: {
  src: string;
  img: [number, number];
  rect: [number, number, number, number]; // x, y, w, h
  className?: string;
  alt: string;
}) {
  const [iw, ih] = img;
  const [x, y, w, h] = rect;
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("bg-no-repeat", className)}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundImage: `url(${src})`,
        backgroundSize: `${(iw / w) * 100}% ${(ih / h) * 100}%`,
        backgroundPosition: `${iw === w ? 0 : (x / (iw - w)) * 100}% ${ih === h ? 0 : (y / (ih - h)) * 100}%`,
      }}
    />
  );
}

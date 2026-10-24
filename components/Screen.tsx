import { screens, screenWidths, type ScreenName } from "@/lib/screens";

type Props = {
  name: ScreenName;
  alt: string;
  /** CSS width the image is laid out at, used for `sizes`. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** A screenshot from the app, served as AVIF with a WebP fallback at three widths. */
export function Screen({ name, alt, sizes = "(max-width: 640px) 70vw, 420px", priority = false, className = "" }: Props) {
  const meta = screens[name];
  const srcSet = (ext: "avif" | "webp") => screenWidths.map((w) => `/screens/${name}-${w}.${ext} ${Math.min(w, meta.width)}w`).join(", ");
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <img
        src={`/screens/${name}-840.webp`}
        srcSet={srcSet("webp")}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="block h-full w-full object-cover"
      />
    </picture>
  );
}

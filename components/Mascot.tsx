export type MascotPose = "hero" | "wave" | "register" | "empty" | "portrait";

type Props = { pose: MascotPose; alt: string; className?: string; width?: number; priority?: boolean };

/** The GiftVault boy. Poses are pre-rendered PNGs with alpha, served as AVIF/WebP at two sizes. */
export function Mascot({ pose, alt, className = "", width = 480, priority = false }: Props) {
  const sizes = `${width}px`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={`/mascot/${pose}-480.avif 480w, /mascot/${pose}-960.avif 960w`} sizes={sizes} />
      <img
        src={`/mascot/${pose}-960.webp`}
        srcSet={`/mascot/${pose}-480.webp 480w, /mascot/${pose}-960.webp 960w`}
        sizes={sizes}
        width={1024}
        height={1024}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </picture>
  );
}

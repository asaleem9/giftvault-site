"use client";

import { useState } from "react";

type Props = { id: string; name: string; size?: number; className?: string };

/** A merchant's brand icon from /public/logos (fetched at build time). Renders nothing if the file is missing. */
export function BrandLogo({ id, name, size = 20, className = "" }: Props) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <img
      src={`/logos/${id}.png`}
      width={size}
      height={size}
      alt={`${name} logo`}
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      className={`rounded-[5px] bg-white object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

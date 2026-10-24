import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-24");
  return ["", "/privacy", "/support"].map((path) => ({ url: `${site.url}${path}`, lastModified }));
}

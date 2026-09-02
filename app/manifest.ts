import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: "Coreline",
    description: site.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#f6f7f5",
    theme_color: "#1f5c4b",
    lang: "en-IN",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

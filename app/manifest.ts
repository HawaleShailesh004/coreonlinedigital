import type { MetadataRoute } from "next";
import { site } from "@/lib/site-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Coreline",
    description: "Websites, AI agents, automations and local search - one team, no handoffs.",
    start_url: "/",
    display: "browser",
    background_color: "#060a08",
    theme_color: "#12e68e",
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

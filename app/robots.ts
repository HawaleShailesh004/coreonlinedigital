import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /samples/ is deliberately NOT listed here. The sample pages carry
        // `noindex` (the businesses in them are fictional - see
        // lib/samples/index.ts), and a crawler that is forbidden to fetch a page
        // never reads the meta tag telling it not to index. Disallowing them was
        // what kept the noindex from taking effect and left the URLs eligible for
        // URL-only indexing. Allow the crawl; let the noindex do the work.
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

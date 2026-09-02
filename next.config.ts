import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Vercel already sends HSTS, but without includeSubDomains - so a
          // subdomain served over plain HTTP stays a downgrade path. Two years
          // and preload-eligible; only add the domain to the preload list once
          // every subdomain is known to be HTTPS-only.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next puts the largest entry in `deviceSizes` in the plain `src` attribute
    // as the no-srcset fallback. The default list tops out at 3840, so any
    // client that ignores srcset was pulling 4K stills - ~663 KB across the ten
    // cards on /work. Nothing here is ever displayed wider than a full-bleed
    // hero, so 2048 is the honest ceiling.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Sample vertical sites use Unsplash photography as stand-ins until real
    // client assets exist. Swap these for /public paths on a real engagement.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

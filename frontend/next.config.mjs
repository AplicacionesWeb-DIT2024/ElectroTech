import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
};

const withPWA = nextPWA({
  dest: "public",

  register: true,
  skipWaiting: true,

  // 🚫 MUY importante: no PWA en dev
  disable: process.env.NODE_ENV === "development",

  // 📄 Página offline
  fallbacks: {
    document: "/offline",
  },

  runtimeCaching: [
    // 🌍 Navegación de páginas
    {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
      },
    },

    // 🖼 Imágenes Cloudinary
    {
      urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "cloudinary-images",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },

    // 🔌 API backend (Railway)
    {
      urlPattern: /^https:\/\/electrotech-production\.up\.railway\.app\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

export default withPWA(nextConfig);
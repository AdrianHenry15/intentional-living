/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  },
}

module.exports = nextConfig

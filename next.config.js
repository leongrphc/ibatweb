/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve the existing catalog images directly on Workers.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.giphy.com', 'media.tenor.com', 'media1.giphy.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

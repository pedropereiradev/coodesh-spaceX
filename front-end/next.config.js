/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images2.imgbox.com',
      },
    ],
  },
};

module.exports = nextConfig

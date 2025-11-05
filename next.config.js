/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Ensure proper routing for Netlify
  trailingSlash: false,
};

module.exports = nextConfig;

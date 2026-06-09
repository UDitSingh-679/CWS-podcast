/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/api/chrome-devtools',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;

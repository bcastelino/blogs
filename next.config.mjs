const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages project site is served from https://<user>.github.io/blogs/
// so we need a basePath/assetPrefix in production builds only.
const repo = 'blogs';
const basePath = isProd ? `/${repo}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: isProd ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
  // Allow the in-IDE browser preview proxy (127.0.0.1) to load /_next/* in dev.
  allowedDevOrigins: ['127.0.0.1'],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

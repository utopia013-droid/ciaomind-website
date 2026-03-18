import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Vercel/Cloudflare 静态导出需要
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 确保国际化路由正常工作
  i18n: {
    locales: ['zh', 'it'],
    defaultLocale: 'zh',
    localeDetection: true,
  },
};

export default withNextIntl(nextConfig);

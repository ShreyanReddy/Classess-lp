/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow SVGs in public/assets without additional loader configuration
  // Next.js Image component handles SVGs from /public natively
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig

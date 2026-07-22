import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers에는 Vercel 이미지 최적화기가 없음.
    // next/image는 로고·about 2곳만 사용하므로 최적화 없이 원본 그대로 제공(양 플랫폼 동일 동작).
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
    ],
  },
};

export default nextConfig;

// `next dev` 실행 시에만 Cloudflare 바인딩 프록시를 초기화(빌드/프로덕션엔 영향 없음).
initOpenNextCloudflareForDev();

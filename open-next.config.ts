import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 초기 이전 버전: 증분 캐시(R2/KV) 없이 배포 → ISR 페이지는 요청 시 렌더링(SSR).
// Notion 데이터는 매 요청마다 최신으로 로드됨. 트래픽 늘면 나중에 KV 캐시 추가 가능.
export default defineCloudflareConfig();

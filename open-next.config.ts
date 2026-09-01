import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

// 증분 캐시(KV) + 리전 캐시(Cache API).
// ISR/SSG 페이지(자료·강의 상세, revalidate=60)를 KV에 캐시해 매 요청 풀 SSR을 피한다.
// 캐시 히트는 react-dom 렌더 없이 반환 → 워커 CPU/메모리 급감(콜드 스타트 1102 완화).
// Notion 데이터 변경은 revalidate 주기(60초) 내에 반영된다.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),
});

// service_role 키를 쓰는 서버 전용 Supabase 클라이언트 — RLS를 우회한다.
// 주문 기록 삽입/조회, CBT 기기 바인딩처럼 "서버만" 해야 하는 작업에 사용.
// ★ SUPABASE_SERVICE_ROLE_KEY 는 절대 클라이언트로 노출 금지(Cloudflare secret).
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

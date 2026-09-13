-- 관리자가 결제 없이 직접 지급한 이용권(계좌이체 입금자·베타테스터 등)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 결제 기록(orders)과 섞지 않는다: 토스 정산 대조 시 실제 결제만 남기기 위함.

create table if not exists public.entitlement_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,               -- 지급받은 소소숲 로그인 유저
  product text not null,               -- 이용권 별칭: 'hangul' | 'cbt' (코드에서 검증)
  note text,                           -- 지급 사유 메모
  granted_at timestamptz default now(),
  revoked_at timestamptz               -- 지급 취소 시각(null 이면 유효)
);

create index if not exists entitlement_grants_user_id_idx
  on public.entitlement_grants (user_id);

alter table public.entitlement_grants enable row level security;

-- ★보안: 정책을 두지 않는다 → 서버의 service_role 키로만 읽고 쓴다(RLS 우회).
--   공개 anon 키로 스스로 이용권을 지급하는 위조를 원천 차단.

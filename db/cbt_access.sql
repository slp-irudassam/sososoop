-- CBT 연습앱 기기 바인딩 (1계정 = 1기기, 계정 공유 방지)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

create table if not exists public.cbt_access (
  user_id uuid primary key,          -- 소소숲 로그인 유저
  device_id text not null,           -- 최초 접근 브라우저의 기기 식별자(localStorage)
  bound_at timestamptz default now() -- 바인딩 시각
);

alter table public.cbt_access enable row level security;

-- 삽입/조회/갱신은 서버가 service_role 키로만 수행(RLS 우회). 클라이언트 직접 접근 차단.
-- 기기 초기화(다른 기기로 옮겨주기)는 관리자가 이 행의 device_id 를 바꾸거나 삭제:
--   delete from public.cbt_access where user_id = '<uuid>';

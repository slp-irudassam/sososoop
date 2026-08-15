-- 토스 결제 주문 기록 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,     -- 결제창에 넘긴 orderId
  payment_key text,                  -- 토스 결제 식별자
  product_slug text,                 -- 상품(예: cbt)
  order_name text,                   -- 주문명
  amount integer,                    -- 결제 금액(KRW)
  status text,                       -- DONE 등
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- 서버(공개키/anon 역할)에서 주문 insert 허용. 조회 정책은 두지 않아 외부 읽기는 차단.
-- (추후 service_role 키로 서버 삽입하도록 바꾸고 이 정책은 제거 권장)
drop policy if exists "allow insert orders" on public.orders;
create policy "allow insert orders"
  on public.orders for insert
  to anon
  with check (true);

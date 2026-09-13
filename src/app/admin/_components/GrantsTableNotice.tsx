// 이용권 수동 지급 테이블(entitlement_grants)이 아직 없을 때 안내.
export default function GrantsTableNotice() {
  return (
    <div className="mb-6 rounded-[14px] border border-amber-200 bg-amber-50 px-5 py-4 text-[14px] text-amber-800 leading-relaxed">
      이용권 수동 지급을 쓰려면 Supabase 대시보드 → SQL Editor에서{' '}
      <code className="px-1.5 py-0.5 rounded bg-white/70 text-[13px]">db/entitlement_grants.sql</code>
      을 한 번 실행해 주세요. 그 전까지 지급 버튼은 동작하지 않지만, 나머지 기능은 그대로 쓸 수 있어요.
    </div>
  );
}

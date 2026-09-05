// 결제로 획득한 이용권(entitlement) 조회 — 서버 전용.
// 결제 성공 시 orders 테이블에 status='DONE' 으로 기록되며, 여기서 그 기록을 근거로
// "이 유저가 해당 상품을 샀는가"를 판정한다. 조회는 RLS를 우회하는 service_role로 한다.
import { createAdminClient } from '@/lib/supabase/admin';
import { getPurchasable } from '@/lib/products';

// CBT 연습앱을 구매했는지 여부. product_slug 는 결제 상품 id(들)를 콤마로 연결한 문자열이며,
// 'cbt' 별칭은 결제 시점에 Notion 상품 UUID로 해석되어 저장되므로 둘 다 매칭한다.
export async function hasCbtEntitlement(userId: string | undefined | null): Promise<boolean> {
  if (!userId) return false;
  const admin = createAdminClient();
  if (!admin) return false;

  const cbt = await getPurchasable('cbt');
  const cbtId = cbt?.id ?? null;

  const { data, error } = await admin
    .from('orders')
    .select('product_slug')
    .eq('user_id', userId)
    .eq('status', 'DONE');

  if (error || !data) return false;

  return data.some((row) => {
    const ids = String(row.product_slug ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    return ids.includes('cbt') || (cbtId != null && ids.includes(cbtId));
  });
}

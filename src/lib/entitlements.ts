// 결제로 획득한 이용권(entitlement) 조회 — 서버 전용.
// 결제 성공 시 orders 테이블에 status='DONE' 으로 기록되며, 여기서 그 기록을 근거로
// "이 유저가 해당 상품을 샀는가"를 판정한다. 조회는 RLS를 우회하는 service_role로 한다.
import { createAdminClient } from '@/lib/supabase/admin';
import { getPurchasable } from '@/lib/products';

// 별칭('cbt'·'hangul')으로 산 상품인지 판정한다. product_slug 는 결제 상품 id(들)를
// 콤마로 연결한 문자열이며, 별칭은 결제 시점에 Notion 상품 UUID로 해석되어 저장되므로
// 별칭과 UUID 둘 다 매칭한다.
async function hasEntitlement(
  userId: string | undefined | null,
  alias: string,
): Promise<boolean> {
  if (!userId) return false;
  const admin = createAdminClient();
  if (!admin) return false;

  const product = await getPurchasable(alias);
  const productId = product?.id ?? null;

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
    return ids.includes(alias) || (productId != null && ids.includes(productId));
  });
}

// CBT 연습앱 이용권 보유 여부.
export function hasCbtEntitlement(userId: string | undefined | null): Promise<boolean> {
  return hasEntitlement(userId, 'cbt');
}

// 한글놀이 이용권 보유 여부.
export function hasHangulEntitlement(userId: string | undefined | null): Promise<boolean> {
  return hasEntitlement(userId, 'hangul');
}

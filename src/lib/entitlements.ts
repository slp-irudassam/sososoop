// 이용권(entitlement) 조회 — 서버 전용.
// 이용권은 두 곳에서 생긴다.
//   1) 결제: orders 테이블에 status='DONE' 으로 기록된 주문
//   2) 관리자 지급: entitlement_grants 테이블의 취소되지 않은 행
// 조회는 RLS를 우회하는 service_role로 한다.
import { createAdminClient } from '@/lib/supabase/admin';
import { getPurchasable } from '@/lib/products';

export const ENTITLEMENT_PRODUCTS = [
  { alias: 'hangul', label: '한글놀이' },
  { alias: 'cbt', label: '모의 CBT' },
] as const;

export type EntitlementAlias = (typeof ENTITLEMENT_PRODUCTS)[number]['alias'];

export function isEntitlementAlias(value: string): value is EntitlementAlias {
  return ENTITLEMENT_PRODUCTS.some((p) => p.alias === value);
}

// product_slug 는 결제 상품 id(들)를 콤마로 연결한 문자열이다.
export function slugIds(productSlug: unknown): string[] {
  return String(productSlug ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// 이용권 별칭 → 그 상품으로 인정되는 product_slug 값들.
// 별칭은 결제 시점에 Notion 상품 UUID로 해석되어 저장되므로 별칭과 UUID 둘 다 포함한다.
async function idsFor(alias: EntitlementAlias): Promise<string[]> {
  const product = await getPurchasable(alias);
  return product ? [alias, product.id] : [alias];
}

export async function entitlementProductIds(): Promise<Record<EntitlementAlias, string[]>> {
  const entries = await Promise.all(
    ENTITLEMENT_PRODUCTS.map(async ({ alias }) => [alias, await idsFor(alias)] as const),
  );
  return Object.fromEntries(entries) as Record<EntitlementAlias, string[]>;
}

async function hasEntitlement(
  userId: string | undefined | null,
  alias: EntitlementAlias,
): Promise<boolean> {
  if (!userId) return false;
  const admin = createAdminClient();
  if (!admin) return false;

  const [ids, orders, grants] = await Promise.all([
    idsFor(alias),
    admin.from('orders').select('product_slug').eq('user_id', userId).eq('status', 'DONE'),
    admin
      .from('entitlement_grants')
      .select('id')
      .eq('user_id', userId)
      .eq('product', alias)
      .is('revoked_at', null)
      .limit(1),
  ]);

  const paid =
    !orders.error &&
    (orders.data ?? []).some((row) => slugIds(row.product_slug).some((id) => ids.includes(id)));
  if (paid) return true;

  // 지급 테이블이 아직 없으면(SQL 미실행) 에러가 난다 → 지급 없음으로 본다.
  return !grants.error && (grants.data?.length ?? 0) > 0;
}

// CBT 연습앱 이용권 보유 여부.
export function hasCbtEntitlement(userId: string | undefined | null): Promise<boolean> {
  return hasEntitlement(userId, 'cbt');
}

// 한글놀이 이용권 보유 여부.
export function hasHangulEntitlement(userId: string | undefined | null): Promise<boolean> {
  return hasEntitlement(userId, 'hangul');
}

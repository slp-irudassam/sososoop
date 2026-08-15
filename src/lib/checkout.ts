// 결제 상품 카탈로그 — 금액의 신뢰 원천(server-of-truth).
// 결제창에는 클라이언트가 금액을 보내지만, 승인(confirm) 시 서버가 이 값과 대조해
// 위변조를 차단한다. 자료실(Notion) 항목과는 slug로 연결한다.

export type CheckoutProduct = {
  slug: string;
  title: string; // 자료실 항목 제목과 정확히 일치시켜 매칭
  orderName: string; // 토스 결제창/영수증에 표기될 주문명
  amount: number; // KRW
};

export const CHECKOUT_PRODUCTS: Record<string, CheckoutProduct> = {
  cbt: {
    slug: 'cbt',
    title: '언어재활사 CBT 연습앱 이용권',
    orderName: '언어재활사 CBT 연습앱 이용권',
    amount: 7900,
  },
};

export function productBySlug(slug: string | undefined | null): CheckoutProduct | null {
  if (!slug) return null;
  return CHECKOUT_PRODUCTS[slug] ?? null;
}

// 자료실 항목 제목으로 결제 가능한 상품 slug를 찾는다(없으면 null → 기존 노션폼 방식 유지).
export function checkoutSlugForTitle(title: string): string | null {
  const found = Object.values(CHECKOUT_PRODUCTS).find((p) => p.title === title);
  return found ? found.slug : null;
}

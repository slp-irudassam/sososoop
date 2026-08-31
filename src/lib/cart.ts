// 장바구니 — 로그인 없이 쓰는 브라우저 localStorage 기반.
// 결제 금액의 신뢰원천은 서버(products.ts)이며, 여기 담긴 price는 표시용 스냅샷이다.

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

const KEY = 'sososoop_cart';
export const CART_EVENT = 'sososoop-cart-change';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

// 이미 담긴 상품이면 false, 새로 담으면 true.
export function addToCart(item: CartItem): boolean {
  const cart = getCart();
  if (cart.some((c) => c.id === item.id)) return false;
  save([...cart, item]);
  return true;
}

export function removeFromCart(id: string) {
  save(getCart().filter((c) => c.id !== id));
}

export function clearCart() {
  save([]);
}

export function isInCart(id: string): boolean {
  return getCart().some((c) => c.id === id);
}

export function cartCount(): number {
  return getCart().length;
}

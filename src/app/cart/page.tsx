'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCart, removeFromCart, CART_EVENT, type CartItem } from '@/lib/cart';

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    setReady(true);
    window.addEventListener(CART_EVENT, update);
    return () => window.removeEventListener(CART_EVENT, update);
  }, []);

  const total = items.reduce((sum, it) => sum + it.price, 0);

  function order() {
    if (items.length === 0) return;
    const ids = items.map((it) => it.id).join(',');
    router.push(`/checkout?items=${encodeURIComponent(ids)}`);
  }

  return (
    <main className="bg-canvas py-12 px-6 min-h-[70vh]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-[26px] font-bold text-ink mb-8">장바구니</h1>

        {!ready ? null : items.length === 0 ? (
          <div className="bg-pearl border border-hairline rounded-[18px] p-12 text-center">
            <p className="text-[16px] text-ink-muted mb-6">장바구니가 비어 있어요.</p>
            <Link
              href="/resources"
              className="inline-block px-6 py-3 rounded-full bg-primary text-white text-[14px] font-semibold hover:bg-primary-dark transition-colors"
            >
              자료 보러 가기
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            {/* 상품 목록 */}
            <div className="flex flex-col gap-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-4 bg-pearl border border-hairline rounded-[14px] p-4"
                >
                  <div className="w-16 h-16 shrink-0 rounded-[10px] overflow-hidden bg-stone-100 flex items-center justify-center">
                    {it.image ? (
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-stone-300" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-ink leading-snug mb-1 truncate">
                      {it.title}
                    </p>
                    <p className="text-[15px] font-bold text-ink">{it.price.toLocaleString()}원</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(it.id)}
                    className="shrink-0 text-[13px] text-ink-light hover:text-ink underline"
                  >
                    삭제
                  </button>
                </div>
              ))}
              <Link
                href="/resources"
                className="text-[13px] text-ink-muted underline mt-1 self-start"
              >
                + 자료 더 담기
              </Link>
            </div>

            {/* 결제 요약 */}
            <aside className="lg:sticky lg:top-24 bg-pearl border border-hairline rounded-[18px] p-6">
              <p className="text-[14px] font-semibold text-ink mb-4">주문 요약</p>
              <div className="flex justify-between text-[14px] text-ink-muted mb-2">
                <span>상품 수</span>
                <span>{items.length}개</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-hairline pt-3 mt-3 mb-5">
                <span className="text-[13px] text-ink-muted">총 결제금액</span>
                <span className="text-[22px] font-bold text-ink">{total.toLocaleString()}원</span>
              </div>
              <button
                onClick={order}
                className="w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-semibold hover:bg-primary-dark transition-colors active:scale-[0.99]"
              >
                주문하기
              </button>
              <p className="text-[11.5px] text-ink-light text-center mt-3 leading-relaxed">
                토스페이먼츠 안전결제
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

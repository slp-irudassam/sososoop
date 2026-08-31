'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  loadTossPayments,
  ANONYMOUS,
  type TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

type Product = {
  id: string;
  title: string;
  orderName: string;
  amount: number;
};

export default function CheckoutClient({ product }: { product: Product }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const initedRef = useRef(false);

  // 결제 위젯(결제수단 + 약관) 렌더링 — 카드·간편결제·계좌이체·가상계좌 등
  // 상점관리자에서 켜둔 결제수단이 모두 노출된다.
  useEffect(() => {
    if (!CLIENT_KEY) {
      setError('결제 설정이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    if (initedRef.current) return;
    initedRef.current = true;

    (async () => {
      try {
        const tossPayments = await loadTossPayments(CLIENT_KEY);
        const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
        widgetsRef.current = widgets;

        await widgets.setAmount({ currency: 'KRW', value: product.amount });
        await Promise.all([
          widgets.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
          widgets.renderAgreement({ selector: '#agreement', variantKey: 'AGREEMENT' }),
        ]);
        setReady(true);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : '결제 수단을 불러오지 못했습니다.');
      }
    })();
  }, [product.amount]);

  async function handlePay() {
    setError('');
    const widgets = widgetsRef.current;
    if (!widgets) return;
    setLoading(true);
    try {
      const orderId = `${product.id}-${crypto.randomUUID()}`.slice(0, 64);
      await widgets.requestPayment({
        orderId,
        orderName: product.orderName,
        successUrl: `${window.location.origin}/payments/success?product=${product.id}`,
        failUrl: `${window.location.origin}/payments/fail?product=${product.id}`,
      });
    } catch (e: unknown) {
      // 사용자가 결제창을 닫거나, 필수 약관 미동의 등
      const msg = e instanceof Error ? e.message : '결제를 시작하지 못했습니다.';
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-start justify-center px-5 py-12">
      <div className="w-full max-w-[520px]">
        <h1 className="text-[22px] font-bold text-ink mb-1">주문 / 결제</h1>
        <p className="text-[13px] text-ink-light mb-6">
          원하는 결제수단을 선택하고 결제해 주세요.
        </p>

        {/* 주문 요약 */}
        <div className="bg-pearl border border-hairline rounded-[16px] p-6 mb-5">
          <p className="text-[16px] font-semibold text-ink leading-snug mb-3">{product.title}</p>
          <div className="flex items-baseline justify-between border-t border-hairline pt-3">
            <span className="text-[13px] text-ink-muted">총 결제금액 (1개)</span>
            <span className="text-[22px] font-bold text-ink">
              {product.amount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제수단 위젯 */}
        <div className="bg-pearl border border-hairline rounded-[16px] overflow-hidden mb-1">
          <div id="payment-method" />
          <div id="agreement" />
        </div>

        {error && (
          <p className="text-[13px] text-red-600 my-3 leading-relaxed px-1">{error}</p>
        )}

        <button
          onClick={handlePay}
          disabled={loading || !ready}
          className="w-full mt-4 py-3.5 rounded-full bg-primary text-white text-[16px] font-semibold hover:bg-primary-dark transition-colors active:scale-[0.99] disabled:opacity-60"
        >
          {loading
            ? '결제창을 여는 중…'
            : ready
              ? `${product.amount.toLocaleString()}원 결제하기`
              : '결제수단 불러오는 중…'}
        </button>

        <p className="text-[11.5px] text-ink-light leading-relaxed mt-4 text-center">
          토스페이먼츠 안전결제 · 카드 · 간편결제 · 계좌이체 · 가상계좌
        </p>
        <Link
          href="/resources"
          className="block text-center text-[12.5px] text-ink-muted underline mt-3"
        >
          취소하고 자료실로 돌아가기
        </Link>
      </div>
    </main>
  );
}

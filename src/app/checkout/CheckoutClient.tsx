'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

type Product = {
  id: string;
  title: string;
  orderName: string;
  amount: number;
};

export default function CheckoutClient({ product }: { product: Product }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePay() {
    setError('');
    if (!CLIENT_KEY) {
      setError('결제 설정이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });
      const orderId = `${product.id}-${crypto.randomUUID()}`;
      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: product.amount },
        orderId,
        orderName: product.orderName,
        successUrl: `${window.location.origin}/payments/success?product=${product.id}`,
        failUrl: `${window.location.origin}/payments/fail?product=${product.id}`,
        customerEmail: email || undefined,
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (e: unknown) {
      // 사용자가 결제창을 닫은 경우 등
      const msg = e instanceof Error ? e.message : '결제를 시작하지 못했습니다.';
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[440px] bg-pearl border border-hairline rounded-[18px] p-7">
        <h1 className="text-[20px] font-bold text-ink mb-1">주문 / 결제</h1>
        <p className="text-[13px] text-ink-light mb-6">아래 내용을 확인하고 결제해 주세요.</p>

        <div className="border border-hairline rounded-[12px] bg-white p-5 mb-5">
          <p className="text-[16px] font-semibold text-ink leading-snug mb-2">{product.title}</p>
          <div className="flex items-baseline justify-between border-t border-hairline pt-3 mt-3">
            <span className="text-[13px] text-ink-muted">결제 금액</span>
            <span className="text-[22px] font-bold text-ink">
              {product.amount.toLocaleString()}원
            </span>
          </div>
        </div>

        <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
          이메일 (영수증 받을 주소, 선택)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full box-border px-3.5 py-3 border border-hairline rounded-[10px] text-[15px] bg-white outline-none focus:border-primary mb-4"
        />

        {error && <p className="text-[13px] text-red-600 mb-3 leading-relaxed">{error}</p>}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-semibold hover:bg-primary-dark transition-colors active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? '결제창을 여는 중…' : `${product.amount.toLocaleString()}원 결제하기`}
        </button>

        <p className="text-[11.5px] text-ink-light leading-relaxed mt-4 text-center">
          신용·체크카드 결제 · 토스페이먼츠 안전결제
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

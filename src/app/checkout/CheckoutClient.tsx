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

type MethodKey = 'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT' | 'MOBILE_PHONE';

const METHODS: { key: MethodKey; label: string; desc: string; icon: string }[] = [
  {
    key: 'CARD',
    label: '카드 · 간편결제',
    desc: '신용·체크카드, 카카오페이·네이버페이·토스페이 등',
    icon: '💳',
  },
  { key: 'TRANSFER', label: '계좌이체', desc: '은행 계좌에서 바로 이체', icon: '🏦' },
  {
    key: 'VIRTUAL_ACCOUNT',
    label: '가상계좌 (무통장입금)',
    desc: '발급된 계좌로 입금하면 이용이 시작돼요',
    icon: '🧾',
  },
  { key: 'MOBILE_PHONE', label: '휴대폰 결제', desc: '통신요금과 함께 청구', icon: '📱' },
];

export default function CheckoutClient({ product }: { product: Product }) {
  const [selected, setSelected] = useState<MethodKey>('CARD');
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
      const orderId = `${product.id}-${crypto.randomUUID()}`.slice(0, 64);
      const base = {
        amount: { currency: 'KRW' as const, value: product.amount },
        orderId,
        orderName: product.orderName,
        successUrl: `${window.location.origin}/payments/success?product=${product.id}`,
        failUrl: `${window.location.origin}/payments/fail?product=${product.id}`,
      };

      if (selected === 'CARD') {
        await payment.requestPayment({
          ...base,
          method: 'CARD',
          card: {
            useEscrow: false,
            flowMode: 'DEFAULT', // 카드+간편결제 통합결제창
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      } else if (selected === 'TRANSFER') {
        await payment.requestPayment({ ...base, method: 'TRANSFER' });
      } else if (selected === 'VIRTUAL_ACCOUNT') {
        await payment.requestPayment({ ...base, method: 'VIRTUAL_ACCOUNT' });
      } else {
        await payment.requestPayment({ ...base, method: 'MOBILE_PHONE' });
      }
    } catch (e: unknown) {
      // 사용자가 결제창을 닫은 경우 등
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

        {/* 결제수단 선택 */}
        <p className="text-[13px] font-semibold text-ink mb-2.5 px-1">결제수단</p>
        <div className="flex flex-col gap-2.5 mb-5">
          {METHODS.map((m) => {
            const active = selected === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelected(m.key)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-[14px] border transition-colors ${
                  active
                    ? 'border-primary bg-primary/5'
                    : 'border-hairline bg-pearl hover:border-primary/40'
                }`}
              >
                <span className="text-[22px] leading-none">{m.icon}</span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold text-ink">{m.label}</span>
                  <span className="block text-[12px] text-ink-muted mt-0.5">{m.desc}</span>
                </span>
                <span
                  className={`shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                    active ? 'border-primary' : 'border-hairline'
                  }`}
                >
                  {active && <span className="w-[9px] h-[9px] rounded-full bg-primary" />}
                </span>
              </button>
            );
          })}
        </div>

        {error && <p className="text-[13px] text-red-600 mb-3 leading-relaxed px-1">{error}</p>}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-semibold hover:bg-primary-dark transition-colors active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? '결제창을 여는 중…' : `${product.amount.toLocaleString()}원 결제하기`}
        </button>

        <p className="text-[11.5px] text-ink-light leading-relaxed mt-4 text-center">
          토스페이먼츠 안전결제
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

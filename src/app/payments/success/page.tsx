import Link from 'next/link';
import { getPurchasable } from '@/lib/products';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Search = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? '') : (v ?? '');
}

async function confirmPayment(paymentKey: string, orderId: string, amount: number) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return { ok: false as const, message: '서버 결제 설정(시크릿 키)이 없습니다.' };
  }
  // 토스 인증: Basic base64("시크릿키:") — Workers 환경이라 btoa 사용
  const auth = btoa(`${secretKey}:`);
  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    return { ok: false as const, message: (data.message as string) || '결제 승인에 실패했습니다.' };
  }
  return { ok: true as const, data };
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const paymentKey = one(sp.paymentKey);
  const orderId = one(sp.orderId);
  const amount = Number(one(sp.amount));
  const product = await getPurchasable(one(sp.product));

  // 1) 금액 위변조 검증 — 서버 카탈로그 가격과 반드시 일치해야 승인 진행
  let result: Awaited<ReturnType<typeof confirmPayment>> | { ok: false; message: string };
  if (!paymentKey || !orderId || !amount) {
    result = { ok: false, message: '결제 정보가 올바르지 않습니다.' };
  } else if (!product || product.amount !== amount) {
    result = { ok: false, message: '결제 금액이 주문 정보와 일치하지 않습니다.' };
  } else {
    // 2) 서버 승인
    result = await confirmPayment(paymentKey, orderId, amount);
  }

  // 3) 주문 기록 (best-effort — 테이블/권한 없으면 조용히 건너뜀)
  if (result.ok) {
    try {
      const supabase = await createClient();
      await supabase.from('orders').insert({
        order_id: orderId,
        payment_key: paymentKey,
        product_slug: product?.id ?? null,
        order_name: product?.orderName ?? null,
        amount,
        status: 'DONE',
      });
    } catch {
      // no-op
    }
  }

  if (!result.ok) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px] bg-pearl border border-hairline rounded-[18px] p-8 text-center">
          <div className="text-[40px] mb-3">⚠️</div>
          <h1 className="text-[19px] font-bold text-ink mb-2">결제를 완료하지 못했어요</h1>
          <p className="text-[14px] text-ink-muted leading-relaxed mb-6">{result.message}</p>
          <Link
            href="/resources"
            className="inline-block px-6 py-3 rounded-full bg-primary text-white text-[14px] font-medium"
          >
            자료실로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[440px] bg-pearl border border-hairline rounded-[18px] p-8 text-center">
        <div className="text-[40px] mb-3">✅</div>
        <h1 className="text-[20px] font-bold text-ink mb-2">결제가 완료되었어요</h1>
        <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
          {product?.title} 구매가 정상 처리되었습니다.
        </p>

        <div className="text-left bg-white border border-hairline rounded-[12px] p-5 mb-6 text-[13.5px]">
          <div className="flex justify-between py-1.5">
            <span className="text-ink-muted">상품</span>
            <span className="text-ink font-medium">{product?.orderName}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-ink-muted">결제 금액</span>
            <span className="text-ink font-semibold">{amount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-ink-muted">주문번호</span>
            <span className="text-ink font-mono text-[12px]">{orderId}</span>
          </div>
        </div>

        <Link
          href="/resources"
          className="inline-block px-6 py-3 rounded-full bg-primary text-white text-[14px] font-medium"
        >
          자료실로 돌아가기
        </Link>
      </div>
    </main>
  );
}

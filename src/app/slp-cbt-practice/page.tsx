import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { hasCbtEntitlement } from '@/lib/entitlements';
import DeviceGate from './DeviceGate';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '언어재활사 CBT 연습',
  description: '언어재활사 국가시험 대비 CBT 모의 연습앱',
};

export default async function CbtPracticePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1) 로그인 필수
  if (!user) redirect('/login?next=/slp-cbt-practice');

  // 2) 결제(이용권) 필수 — 미결제면 구매 안내
  const entitled = await hasCbtEntitlement(user.id);
  if (!entitled) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px] bg-pearl border border-hairline rounded-[18px] p-8 text-center">
          <h1 className="text-[20px] font-bold text-ink mb-2">언어재활사 CBT 연습</h1>
          <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
            이 연습앱은 이용권을 구매한 회원만 이용할 수 있어요.
            <br />
            구매 후 이 페이지에서 바로 시작할 수 있습니다.
          </p>
          <Link
            href="/checkout?product=cbt"
            className="inline-block px-6 py-3 rounded-full bg-primary text-white text-[15px] font-semibold hover:bg-primary-dark transition-colors"
          >
            이용권 구매하기
          </Link>
          <div className="mt-4">
            <Link href="/resources" className="text-[13px] text-ink-muted underline">
              자료실 둘러보기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 3) 결제 확인됨 — 기기 바인딩 후 앱 표시
  return <DeviceGate />;
}

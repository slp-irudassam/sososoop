// 한글놀이 사용법(manual) 서빙 — 역시 로그인+결제 게이트 뒤.
import { createClient } from '@/lib/supabase/server';
import { hasHangulEntitlement } from '@/lib/entitlements';
import { NextResponse } from 'next/server';
import manualHtml from '../manual-html.json';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', '/hangul/manual');
    return NextResponse.redirect(url);
  }

  // 결제 확인 — 미결제면 구매 안내가 있는 소개 페이지로.
  const entitled = await hasHangulEntitlement(user.id);
  if (!entitled) return NextResponse.redirect(new URL('/hangul', request.url));

  // 앱(iframe)으로 돌아가는 링크 재작성.
  const html = (manualHtml as string).replaceAll(
    'href="index.html"',
    'href="/hangul/app"',
  );

  return new NextResponse(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'private, no-store',
    },
  });
}

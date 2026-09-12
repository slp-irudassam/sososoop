// 한글놀이 앱 원본(단일 HTML)을 서빙 — 로그인+결제 게이트 뒤. /hangul 페이지의 iframe이 이걸 불러옴.
// 페이지에서 한 번 걸렀지만, 직접 접근을 막기 위해 라우트에서도 세션·이용권을 재확인한다.
import { createClient } from '@/lib/supabase/server';
import { hasHangulEntitlement } from '@/lib/entitlements';
import { NextResponse } from 'next/server';
import appHtml from '../app-html.json';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', '/hangul');
    return NextResponse.redirect(url);
  }

  // 결제 확인 — 미결제면 구매 안내가 있는 소개 페이지로.
  const entitled = await hasHangulEntitlement(user.id);
  if (!entitled) return NextResponse.redirect(new URL('/hangul', request.url));

  // 소소숲 경로에 맞게 사용법 링크만 재작성.
  const html = (appHtml as string).replace(
    'href="manual.html"',
    'href="/hangul/manual"',
  );

  return new NextResponse(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'private, no-store',
    },
  });
}

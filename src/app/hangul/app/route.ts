// 한글놀이 앱 원본(단일 HTML)을 서빙 — 로그인 게이트 뒤. /hangul 페이지의 iframe이 이걸 불러옴.
// 미들웨어(proxy)가 1차로 막지만, 라우트에서도 세션 재확인 = 이중 방어.
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import appHtml from '../app-html.json';

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

// 한글놀이 사용법(manual) 서빙 — 역시 로그인 게이트 뒤.
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import manualHtml from '../manual-html.json';

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

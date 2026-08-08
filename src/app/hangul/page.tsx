import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: '한글놀이',
  description: '난독·읽기부진 아동을 위한 한글 블렌딩 학습 도구',
};

export default async function HangulPage() {
  // proxy가 1차 게이팅하지만, 페이지에서도 세션 재확인.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/hangul');

  return (
    // 소소숲 헤더(높이 2.75rem) 아래를 꽉 채워 앱을 담는다.
    <div className="w-full" style={{ height: 'calc(100dvh - 2.75rem)' }}>
      <iframe
        src="/hangul/app"
        title="한글놀이"
        className="block w-full h-full border-0"
        allow="fullscreen; clipboard-write"
      />
    </div>
  );
}

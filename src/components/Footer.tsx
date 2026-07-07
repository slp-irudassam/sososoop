import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-parchment border-t border-hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-[14px] font-semibold text-ink mb-3">소소숲:지혜의 기록소</p>
            <p className="text-[12px] text-ink-muted leading-relaxed">
              운영자: 소소숲 · 언어재활사 · AI 활용 강사
            </p>
            <p className="text-[12px] text-ink-muted">
              문의: 카카오채널 @소소숲
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-semibold text-ink mb-1">바로가기</p>
            {[
              { label: '소소숲 소개', href: '/about' },
              { label: '자료실', href: '/resources' },
              { label: '강의', href: '/lectures' },
              { label: '무료특강 신청', href: '/free-lecture' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-ink-muted hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-semibold text-ink mb-1">소셜</p>
            <a
              href="https://www.instagram.com/slp_irudassam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-ink-muted hover:text-primary transition-colors"
            >
              인스타그램 @slp_irudassam
            </a>
            <a
              href="http://pf.kakao.com/_gngTX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-ink-muted hover:text-primary transition-colors"
            >
              카카오채널 상담
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col md:flex-row justify-between gap-2">
          <div>
            <p className="text-[10px] text-ink-light">
              © 2026 소소숲:지혜의 기록소. All rights reserved.
            </p>
            <p className="text-[10px] text-ink-light mt-1">
              사업자등록번호: 203-33-40593
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[10px] text-ink-light hover:text-ink transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/refund" className="text-[10px] text-ink-light hover:text-ink transition-colors">
              환불정책
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

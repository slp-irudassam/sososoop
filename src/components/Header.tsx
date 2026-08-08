'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

const navLinks = [
  { label: '소소숲 소개', href: '/about' },
  { label: '자료실', href: '/resources' },
  { label: '한글놀이', href: '/hangul' },
  { label: '강의', href: '/lectures' },
  { label: '무료특강 신청', href: '/free-lecture' },
  { label: '고객센터', href: 'http://pf.kakao.com/_gngTX', external: true },
];

function displayName(user: User) {
  const meta = user.user_metadata ?? {};
  return (
    meta.name || meta.full_name || meta.nickname || user.email?.split('@')[0] || '회원'
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-nav-black text-on-dark">
      <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/sososoop-logo-white.png" alt="소소숲 로고" width={28} height={28} />
          <span className="text-xs font-semibold tracking-tight text-on-dark">
            소소숲<span className="text-primary-on-dark">:지혜의 기록소</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-on-dark/80 hover:text-on-dark transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-on-dark/80 hover:text-on-dark transition-colors"
              >
                {link.label}
              </Link>
            )
          )}

          {/* 로그인 상태 */}
          <span className="w-px h-4 bg-white/20" aria-hidden />
          {user ? (
            <span className="flex items-center gap-3">
              <span className="text-[12px] text-primary-on-dark">{displayName(user)}님</span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-[12px] text-on-dark/70 hover:text-on-dark transition-colors"
                >
                  로그아웃
                </button>
              </form>
            </span>
          ) : (
            <Link
              href="/login"
              className="text-[12px] font-semibold text-primary-on-dark hover:text-on-dark transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>

        <button
          className="md:hidden text-on-dark p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[#1a1a1a] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-on-dark/80 hover:text-on-dark transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-on-dark/80 hover:text-on-dark transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          <span className="h-px bg-white/10" aria-hidden />
          {user ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-on-dark">{displayName(user)}님</span>
              <form action="/auth/signout" method="post">
                <button type="submit" className="text-sm text-on-dark/70 hover:text-on-dark">
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-primary-on-dark hover:text-on-dark"
              onClick={() => setMenuOpen(false)}
            >
              로그인
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

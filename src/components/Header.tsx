'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { label: '소소숲 소개', href: '/about' },
  { label: '자료실', href: '/resources' },
  { label: '강의', href: '/lectures' },
  { label: '무료특강 신청', href: '/free-lecture' },
  { label: '고객센터', href: 'http://pf.kakao.com/_gngTX', external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        </nav>
      )}
    </header>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';

type CardData = {
  id: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  badge?: string;
  image?: string;
};

type Props = {
  title: string;
  viewAllHref: string;
  cards: CardData[];
  dark?: boolean;
};

function CardThumbnail({ image, title, dark }: { image?: string; title: string; dark: boolean }) {
  if (image) {
    return (
      <div className="w-full h-36 overflow-hidden rounded-t-[14px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`w-full h-36 rounded-t-[14px] flex items-center justify-center ${
        dark ? 'bg-white/5' : 'bg-stone-100'
      }`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={dark ? 'text-white/15' : 'text-stone-300'} stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}

export default function SectionCarousel({ title, viewAllHref, cards, dark = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  return (
    <section className={dark ? 'bg-tile-dark' : 'bg-pearl'}>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-[21px] font-semibold tracking-tight ${dark ? 'text-on-dark' : 'text-ink'}`}>
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className={`text-[14px] px-4 py-2 rounded-full border transition-colors ${
              dark
                ? 'border-primary-on-dark/40 text-primary-on-dark hover:border-primary-on-dark'
                : 'border-primary/40 text-primary hover:border-primary'
            }`}
          >
            전체보기
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            aria-label="이전"
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-opacity ${
              dark ? 'bg-tile-dark-2 text-on-dark' : 'bg-canvas text-ink'
            }`}
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className={`flex-none w-60 rounded-[18px] overflow-hidden border transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                  dark
                    ? 'bg-tile-dark-2 border-white/10 hover:border-white/20'
                    : 'bg-canvas border-hairline hover:border-warm-tan/50'
                }`}
              >
                <CardThumbnail image={card.image} title={card.title} dark={dark} />
                <div className="p-5">
                  {card.badge && (
                    <span className="inline-block text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                      {card.badge}
                    </span>
                  )}
                  <h3 className={`text-[15px] font-semibold leading-tight mb-2 ${dark ? 'text-on-dark' : 'text-ink'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed mb-3 line-clamp-2 ${dark ? 'text-on-dark/60' : 'text-ink-muted'}`}>
                    {card.description}
                  </p>
                  <p className={`text-[13px] font-semibold ${dark ? 'text-primary-on-dark' : 'text-primary'}`}>
                    {card.meta}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            aria-label="다음"
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-opacity ${
              dark ? 'bg-tile-dark-2 text-on-dark' : 'bg-canvas text-ink'
            }`}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

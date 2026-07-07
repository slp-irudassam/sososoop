'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    eyebrow: '소소숲:지혜의 기록소',
    headline: '작은 것이 자라서\n특별한 것이 됩니다.',
    sub: '언어재활사와 교육 전문가를 위한 배움·기록·나눔 공간',
    cta: { label: '강의 보러가기', href: '/lectures' },
    ctaSecondary: { label: '무료 자료 받기', href: '/resources' },
    bg: 'bg-tile-dark',
    dark: true,
    image: '/images/hero-1.png', // 원하는 이미지 경로로 교체하세요 (public/images/ 폴더에 파일 추가)
  },
  {
    id: 2,
    eyebrow: '무료특강',
    headline: '함께 배우고\n함께 성장합니다.',
    sub: '무료특강 신청으로 소소숲의 첫 번째 수업을 경험해보세요.',
    cta: { label: '무료특강 신청', href: '/free-lecture' },
    ctaSecondary: { label: '소소숲 소개', href: '/about' },
    bg: 'bg-parchment',
    dark: false,
    image: '/images/hero-2.png',
  },
  {
    id: 3,
    eyebrow: '자료실',
    headline: '배움은 기록될 때\n자산이 됩니다.',
    sub: '임상에서 바로 쓸 수 있는 무료 자료를 지금 다운로드하세요.',
    cta: { label: '자료 다운로드', href: '/resources' },
    ctaSecondary: { label: 'Lectures', href: '/lectures' },
    bg: 'bg-tile-dark-2',
    dark: true,
    image: '/images/hero-3.png',
  },
];

function ImagePlaceholder({ dark }: { dark: boolean }) {
  return (
    <div
      className={`absolute inset-0 ${dark ? 'bg-gradient-to-br from-neutral-800 to-neutral-900' : 'bg-gradient-to-br from-stone-200 to-stone-300'}`}
    />
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const hasImage = slide.image && !imgErrors[slide.id];

  return (
    <section className={`relative w-full overflow-hidden ${!hasImage ? slide.bg : ''} transition-colors duration-700`}>
      {/* 배경 이미지 */}
      {hasImage ? (
        <>
          <img
            src={slide.image}
            alt=""
            aria-hidden
            onError={() => setImgErrors((prev) => ({ ...prev, [slide.id]: true }))}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      ) : (
        <ImagePlaceholder dark={slide.dark} />
      )}

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <div className="max-w-[600px]">
          <p
            className={`text-[14px] font-semibold tracking-wider mb-4 ${
              hasImage ? 'text-white/80' : slide.dark ? 'text-primary-on-dark' : 'text-primary'
            }`}
          >
            {slide.eyebrow}
          </p>
          <h1
            className={`text-[40px] md:text-[56px] font-semibold leading-[1.07] tracking-tight whitespace-pre-line mb-5 ${
              hasImage ? 'text-white' : slide.dark ? 'text-on-dark' : 'text-ink'
            }`}
          >
            {slide.headline}
          </h1>
          <p
            className={`text-[17px] leading-[1.47] mb-8 ${
              hasImage ? 'text-white/75' : slide.dark ? 'text-on-dark/70' : 'text-ink-muted'
            }`}
          >
            {slide.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white text-[17px] hover:bg-primary-dark transition-colors active:scale-95"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className={`inline-flex items-center px-6 py-3 rounded-full text-[17px] border transition-colors active:scale-95 ${
                hasImage
                  ? 'border-white/40 text-white hover:border-white/70'
                  : slide.dark
                  ? 'border-on-dark/30 text-on-dark hover:border-on-dark/60'
                  : 'border-primary/40 text-primary hover:border-primary'
              }`}
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? hasImage ? 'bg-white w-5' : slide.dark ? 'bg-primary-on-dark w-5' : 'bg-primary w-5'
                : hasImage ? 'bg-white/40' : slide.dark ? 'bg-on-dark/30' : 'bg-ink/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

import HeroSlider from '@/components/HeroSlider';
import SectionCarousel from '@/components/SectionCarousel';
import MarqueeBanner from '@/components/MarqueeBanner';
import { lectures } from '@/data/lectures';
import { resources } from '@/data/resources';
import Link from 'next/link';

export default function HomePage() {
  const lectureCards = lectures.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    meta: `${l.price.toLocaleString()}원 · ${l.duration}`,
    href: `/lectures/${l.id}`,
    badge: l.category,
  }));

  const resourceCards = resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    meta: `무료 · ${r.fileType}`,
    href: `/resources#${r.id}`,
    badge: r.category,
  }));

  return (
    <>
      <HeroSlider />

      <SectionCarousel
        title="자료실"
        viewAllHref="/resources"
        cards={resourceCards}
        dark={false}
      />

      <MarqueeBanner />

      <SectionCarousel
        title="강의 목록"
        viewAllHref="/lectures"
        cards={lectureCards}
        dark={true}
      />

      <section className="bg-canvas">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <p className="text-[14px] font-semibold text-primary mb-3 tracking-wide">무료특강</p>
          <h2 className="text-[40px] font-semibold tracking-tight text-ink mb-4">
            소소숲을 먼저 만나보세요.
          </h2>
          <p className="text-[17px] text-ink-muted leading-[1.47] mb-8 max-w-[480px] mx-auto">
            정규 강의 오픈에 앞서 진행하는 무료특강입니다. 신청하고 소소숲 콘텐츠를 경험해보세요.
          </p>
          <Link
            href="/free-lecture"
            className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white text-[17px] hover:bg-primary-dark transition-colors active:scale-95"
          >
            무료특강 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}

import HeroSlider from '@/components/HeroSlider';
import SectionCarousel from '@/components/SectionCarousel';

import { lectures } from '@/data/lectures';
import { freeResources, paidResources } from '@/data/resources';
import { getResources } from '@/lib/notion';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const notionResources = await getResources();

  const free = notionResources ? notionResources.filter((r) => r.type === 'free') : freeResources;
  const paid = notionResources ? notionResources.filter((r) => r.type === 'paid') : paidResources;
  const allResources = [...free, ...paid];

  const lectureCards = lectures.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    meta: `${l.price.toLocaleString()}원 · ${l.duration}`,
    href: `/lectures/${l.id}`,
    badge: l.category,
    image: l.image,
  }));

  const resourceCards = allResources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    meta: r.type === 'paid' ? `${r.price?.toLocaleString()}원 · ${r.fileType}` : `무료 · ${r.fileType}`,
    href: `/resources#${r.id}`,
    badge: r.category,
    image: r.image,
  }));

  return (
    <>
      <HeroSlider />

      <SectionCarousel
        title="RESOURCES"
        viewAllHref="/resources"
        cards={resourceCards}
        dark={false}
      />

      <SectionCarousel
        title="LECTURES"
        viewAllHref="/lectures"
        cards={lectureCards}
        dark={false}
      />

      <section className="bg-canvas">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <p className="text-[14px] font-semibold text-primary mb-3 tracking-wide">무료특강</p>
          <h2 className="text-[40px] font-semibold tracking-tight text-ink mb-4">
            소소숲을,<br />먼저 만나보세요.
          </h2>
          <p className="text-[17px] text-ink-muted leading-[1.47] mb-8 max-w-[480px] mx-auto">
            정규 강의 오픈에 앞서 진행하는 무료특강입니다.<br />신청하고 소소숲 콘텐츠를 경험해보세요.
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

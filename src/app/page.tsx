import HeroSlider from '@/components/HeroSlider';
import SectionCarousel from '@/components/SectionCarousel';

import { lectures as staticLectures } from '@/data/lectures';
import { freeResources, paidResources } from '@/data/resources';
import { getResources, getLectures } from '@/lib/notion';

export const revalidate = 60;

export default async function HomePage() {
  const [notionResources, notionLectures] = await Promise.all([getResources(), getLectures()]);

  const free = notionResources ? notionResources.filter((r) => r.type === 'free') : freeResources;
  const paid = notionResources ? notionResources.filter((r) => r.type === 'paid') : paidResources;
  const allResources = [...free, ...paid];

  const lectures = notionLectures ?? staticLectures;

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
        title="자료실"
        viewAllHref="/resources"
        cards={resourceCards}
        dark={false}
      />

      <SectionCarousel
        title="강의"
        viewAllHref="/lectures"
        cards={lectureCards}
        dark={false}
      />
    </>
  );
}

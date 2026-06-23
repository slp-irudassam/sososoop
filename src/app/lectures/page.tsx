import Link from 'next/link';
import { lectures } from '@/data/lectures';

export default function LecturesPage() {
  return (
    <>
      <section className="bg-tile-dark py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[14px] font-semibold text-primary-on-dark mb-2">온라인 강의</p>
          <h1 className="text-[40px] font-semibold tracking-tight text-on-dark mb-4">강의 목록</h1>
          <p className="text-[17px] text-on-dark/70 leading-[1.47]">
            언어재활사와 교육 전문가를 위한 실전 강의입니다.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-12 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/lectures/${lecture.id}`}
                className="block bg-pearl rounded-[18px] p-6 border border-hairline hover:border-warm-tan/60 hover:shadow-sm transition-all group"
              >
                <span className="inline-block text-[12px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  {lecture.category}
                </span>
                <h2 className="text-[19px] font-semibold text-ink mb-3 leading-snug group-hover:text-primary transition-colors">
                  {lecture.title}
                </h2>
                <p className="text-[14px] text-ink-muted leading-relaxed mb-5 line-clamp-3">
                  {lecture.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[19px] font-semibold text-ink">
                      {lecture.price.toLocaleString()}원
                    </p>
                    <p className="text-[13px] text-ink-light">{lecture.duration}</p>
                  </div>
                  <span className="text-[14px] text-primary font-medium group-hover:underline">
                    자세히 보기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

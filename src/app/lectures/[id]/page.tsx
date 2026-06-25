import { lectures as staticLectures } from '@/data/lectures';
import { getLectures } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  return staticLectures.map((l) => ({ id: l.id }));
}

export default async function LectureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const notionLectures = await getLectures();
  const lectures = notionLectures ?? staticLectures;
  const lecture = lectures.find((l) => l.id === id);

  if (!lecture) notFound();

  return (
    <>
      {/* 강의 헤더 */}
      <section className="bg-tile-dark py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/lectures"
            className="inline-flex items-center gap-1 text-[14px] text-on-dark/50 hover:text-on-dark/80 transition-colors mb-6"
          >
            ← 강의 목록으로
          </Link>
          <span className="block text-[12px] font-semibold text-primary-on-dark mb-3">
            {lecture.category}
          </span>
          <h1 className="text-[34px] md:text-[40px] font-semibold tracking-tight text-on-dark mb-4 leading-tight">
            {lecture.title}
          </h1>
          <p className="text-[17px] text-on-dark/70 leading-[1.47] mb-6">
            {lecture.description}
          </p>
          <div className="flex flex-wrap gap-4 text-[14px] text-on-dark/60">
            <span>⏱ {lecture.duration}</span>
            <span>🌲 이루다쌤 (이승윤)</span>
          </div>
        </div>
      </section>

      {/* 가격 + 신청 안내 */}
      <section className="bg-parchment py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-canvas rounded-[18px] p-8 border border-hairline mb-8">
            <h2 className="text-[21px] font-semibold text-ink mb-6">강의 신청 안내</h2>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-[34px] font-semibold text-ink">
                {lecture.price.toLocaleString()}원
              </span>
            </div>

            <div className="bg-parchment rounded-[12px] p-5 mb-6">
              <p className="text-[14px] font-semibold text-ink mb-3">📌 신청 방법</p>
              <ol className="flex flex-col gap-2 text-[14px] text-ink-muted leading-relaxed">
                <li>1. 아래 계좌로 수강료를 이체합니다.</li>
                <li>2. 아래 노션 신청서를 작성합니다.</li>
                <li>
                  3. 카카오채널에서{' '}
                  <span className="font-semibold text-ink">'신청완료'</span>를 입력하면
                  강의 안내를 드립니다.
                </li>
              </ol>
            </div>

            <div className="bg-primary/8 rounded-[12px] p-5 mb-6 border border-primary/20">
              <p className="text-[14px] font-semibold text-ink mb-3">💳 입금 계좌</p>
              <p className="text-[17px] font-semibold text-ink">
                {lecture.accountInfo.bank} {lecture.accountInfo.number}
              </p>
              <p className="text-[14px] text-ink-muted mt-1">
                예금주: {lecture.accountInfo.holder}
              </p>
            </div>

            <a
              href={lecture.notionFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-primary text-white text-[17px] font-medium hover:bg-primary-dark transition-colors active:scale-95"
            >
              신청서 작성하기 (노션폼)
            </a>

            <p className="text-[12px] text-ink-light text-center mt-4">
              신청서 작성 후 입금 → 카카오채널 '신청완료' 입력 순서로 진행해주세요.
            </p>
          </div>

          <div className="bg-canvas rounded-[18px] p-6 border border-hairline">
            <p className="text-[14px] font-semibold text-ink mb-3">문의</p>
            <p className="text-[14px] text-ink-muted mb-4">
              강의에 대해 궁금한 점은 카카오채널로 문의해주세요.
            </p>
            <a
              href="http://pf.kakao.com/_gngTX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEE500] text-[#3C1E1E] text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              카카오채널 문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

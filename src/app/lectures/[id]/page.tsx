import type { Metadata } from 'next';
import { lectures as staticLectures } from '@/data/lectures';
import { lectureDetails } from '@/data/lectureDetails';
import { getLectures } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AccountCopy from '@/components/AccountCopy';

export const revalidate = 60;

export async function generateStaticParams() {
  return staticLectures.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lecture =
    staticLectures.find((l) => l.id === id) ??
    (await getLectures())?.find((l) => l.id === id);

  if (!lecture) return {};

  return {
    title: lecture.title,
    description: lecture.description,
  };
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

  const detail = lectureDetails[lecture.id];

  return (
    <>
      {/* 강의 헤더 */}
      <section className={`relative overflow-hidden py-16 px-6 ${lecture.image ? '' : 'bg-tile-dark'}`}>
        {lecture.image && (
          <>
            <img
              src={lecture.image}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative z-10 max-w-[800px] mx-auto">
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
            <span>🌲 소소숲</span>
          </div>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-primary text-white text-[15px] font-medium hover:bg-primary-dark transition-colors active:scale-95"
          >
            강의 신청하기 ↓
          </a>
        </div>
      </section>

      {/* 강의 상세 소개 */}
      {detail && (
        <section className="bg-parchment py-12 px-6">
          <div className="max-w-[800px] mx-auto flex flex-col gap-8">
            {/* 소개 */}
            <p className="text-[17px] text-ink leading-[1.7]">{detail.intro}</p>

            {/* 이런 분께 추천 */}
            <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
              <h2 className="text-[21px] font-semibold text-ink mb-5">
                이런 분께 추천해요
              </h2>
              <ul className="flex flex-col gap-3">
                {detail.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[15px] text-ink-muted leading-relaxed"
                  >
                    <span className="text-primary mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 커리큘럼 */}
            <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
              <h2 className="text-[21px] font-semibold text-ink mb-6">커리큘럼</h2>
              <div className="flex flex-col gap-6">
                {detail.curriculum.map((section) => (
                  <div key={section.part}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="shrink-0 px-3 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-semibold">
                        {section.part}
                      </span>
                      <h3 className="text-[17px] font-semibold text-ink">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-2 pl-1">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[14px] text-ink-muted leading-relaxed"
                        >
                          <span className="text-primary/60 mt-0.5">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 전체 제작 흐름 */}
            {detail.flow && (
              <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
                <h2 className="text-[21px] font-semibold text-ink mb-2">
                  전체 제작 흐름
                </h2>
                <p className="text-[14px] text-ink-light mb-5">
                  기획부터 출간까지, 이 순서대로 완성합니다.
                </p>
                <div className="flex flex-col">
                  {detail.flow.map((row, i) => (
                    <div
                      key={row.step}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 ${
                        i > 0 ? 'border-t border-hairline' : ''
                      }`}
                    >
                      <span className="text-[14px] text-ink font-medium">
                        {row.step}
                      </span>
                      <span className="text-[13px] text-ink-light">{row.tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 포함 혜택 + 준비물 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
                <h2 className="text-[21px] font-semibold text-ink mb-5">
                  포함된 혜택
                </h2>
                <ul className="flex flex-col gap-3">
                  {detail.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] text-ink-muted leading-relaxed"
                    >
                      <span className="text-primary mt-0.5">🎁</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
                <h2 className="text-[21px] font-semibold text-ink mb-5">
                  수강 전 준비물
                </h2>
                <ul className="flex flex-col gap-3">
                  {detail.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] text-ink-muted leading-relaxed"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
              <h2 className="text-[21px] font-semibold text-ink mb-6">
                자주 묻는 질문
              </h2>
              <div className="flex flex-col gap-5">
                {detail.faq.map((item) => (
                  <div key={item.q}>
                    <p className="text-[15px] font-semibold text-ink mb-1.5">
                      Q. {item.q}
                    </p>
                    <p className="text-[14px] text-ink-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 가격 + 신청 안내 */}
      <section id="apply" className="bg-parchment py-12 px-6 scroll-mt-16">
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

            <AccountCopy
              bank={lecture.accountInfo.bank}
              number={lecture.accountInfo.number}
              holder={lecture.accountInfo.holder}
            />

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

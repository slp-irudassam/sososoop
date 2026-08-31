import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { freeResources, paidResources, type Resource } from '@/data/resources';
import { getResources } from '@/lib/notion';
import PurchaseBox from '@/components/PurchaseBox';

export const revalidate = 60;

const staticAll = [...freeResources, ...paidResources];

async function loadAll(): Promise<Resource[]> {
  return (await getResources()) ?? staticAll;
}

export async function generateStaticParams() {
  return paidResources.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resource = (await loadAll()).find((r) => r.id === id);
  if (!resource) return {};
  return { title: resource.title, description: resource.description };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = (await loadAll()).find((r) => r.id === id);

  if (!resource) notFound();

  const isPaid = resource.type === 'paid' && typeof resource.price === 'number' && resource.price > 0;

  return (
    <>
      {/* 헤더 */}
      <section
        className={`relative overflow-hidden py-16 px-6 ${resource.image ? '' : 'bg-tile-dark'}`}
      >
        {resource.image && (
          <>
            <img
              src={resource.image}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative z-10 max-w-[1120px] mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-[14px] text-on-dark/50 hover:text-on-dark/80 transition-colors mb-6"
          >
            ← 자료실로
          </Link>
          <div className="flex items-center gap-2 mb-3">
            {resource.category && (
              <span className="text-[12px] font-semibold text-primary-on-dark">
                {resource.category}
              </span>
            )}
            {resource.fileType && (
              <span className="text-[12px] text-on-dark/50">· {resource.fileType}</span>
            )}
          </div>
          <h1 className="text-[34px] md:text-[40px] font-semibold tracking-tight text-on-dark mb-4 leading-tight max-w-[720px]">
            {resource.title}
          </h1>
          {isPaid && (
            <a
              href="#apply"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-primary text-white text-[15px] font-medium hover:bg-primary-dark transition-colors active:scale-95 lg:hidden"
            >
              결제하기 ↓
            </a>
          )}
        </div>
      </section>

      {/* 본문: 설명(좌) + 결제 박스(우) */}
      <section className="bg-parchment py-12 px-6">
        <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          {/* 왼쪽: 자료 소개 */}
          <div className="flex flex-col gap-8 min-w-0">
            <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
              <h2 className="text-[21px] font-semibold text-ink mb-5">자료 소개</h2>
              <p className="text-[16px] text-ink leading-[1.75] whitespace-pre-line">
                {resource.description}
              </p>
            </div>

            <div className="bg-canvas rounded-[18px] p-8 border border-hairline">
              <h2 className="text-[21px] font-semibold text-ink mb-5">이용 안내</h2>
              <ul className="flex flex-col gap-3 text-[15px] text-ink-muted leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-primary mt-0.5">✓</span>
                  결제 완료 후 자료실에서 바로 이용하거나 안내에 따라 받아보실 수 있어요.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary mt-0.5">✓</span>
                  신용·체크카드로 안전하게 결제됩니다 (토스페이먼츠).
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary mt-0.5">✓</span>
                  이용 중 궁금한 점은 카카오채널로 문의해주세요.
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽: 결제 박스 / 무료 자료면 이용 링크 */}
          {isPaid ? (
            <PurchaseBox
              productId={resource.id}
              title={resource.title}
              price={resource.price as number}
            />
          ) : (
            <aside className="lg:sticky lg:top-24">
              <div className="bg-canvas rounded-[18px] p-6 border border-hairline">
                <span className="inline-block text-[12px] font-semibold text-primary mb-3">
                  무료 자료
                </span>
                <h2 className="text-[18px] font-semibold text-ink leading-snug mb-4">
                  {resource.title}
                </h2>
                {resource.linkUrl ? (
                  <a
                    href={resource.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-medium hover:bg-primary-dark transition-colors active:scale-95"
                  >
                    {resource.fileType} 사용하러 가기
                  </a>
                ) : (
                  <a
                    href={resource.fileUrl}
                    download={resource.downloadName ?? ''}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-medium hover:bg-primary-dark transition-colors active:scale-95"
                  >
                    무료 다운로드
                  </a>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

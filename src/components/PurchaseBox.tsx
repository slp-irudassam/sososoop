import Link from 'next/link';

type Props = {
  productId: string;
  title: string;
  price: number;
  badge?: string; // 예: '바로 구매', '모집중'
  note?: string; // 결제 버튼 아래 안내 문구
};

// 자료·강의 상세페이지 우측의 결제 박스. 클릭하면 결제 페이지(/checkout)로 이동.
export default function PurchaseBox({
  productId,
  title,
  price,
  badge = '바로 구매',
  note = '신용·체크카드 · 토스페이먼츠 안전결제 · 결제 후 바로 이용 안내',
}: Props) {
  return (
    <aside id="apply" className="lg:sticky lg:top-24 flex flex-col gap-6 scroll-mt-24">
      <div className="bg-canvas rounded-[18px] p-6 border border-hairline">
        <span className="inline-block text-[12px] font-semibold text-primary mb-3">{badge}</span>
        <h2 className="text-[18px] font-semibold text-ink leading-snug mb-4">{title}</h2>

        <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-hairline">
          <span className="text-[28px] font-semibold text-ink">{price.toLocaleString()}원</span>
        </div>

        <Link
          href={`/checkout?product=${productId}`}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary text-white text-[16px] font-medium hover:bg-primary-dark transition-colors active:scale-95"
        >
          카드로 결제하기
        </Link>

        <p className="text-[12px] text-ink-light text-center mt-3 leading-relaxed">{note}</p>
      </div>

      <div className="bg-canvas rounded-[18px] p-6 border border-hairline">
        <p className="text-[14px] font-semibold text-ink mb-3">문의</p>
        <p className="text-[14px] text-ink-muted mb-4">
          궁금한 점은 카카오채널로 문의해주세요.
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
    </aside>
  );
}

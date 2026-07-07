import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '무료특강 신청',
  description:
    '정규 강의 오픈에 앞서 진행하는 소소숲 무료특강. 신청하고 소소숲 콘텐츠를 먼저 경험해보세요.',
};

export default function FreeLecturePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary min-h-[320px] py-16 md:py-20 px-6">
        <img src="/images/free-lecture-hero-welcome-desk.png" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <p className="text-[14px] font-semibold text-white/70 mb-2 tracking-wide">SOSOSOOP</p>
          <h1 className="text-[40px] font-semibold tracking-tight text-white mb-4">
            무료특강 신청
          </h1>
          <p className="text-[17px] text-white/80 leading-[1.47] max-w-[480px] mx-auto">
            소소숲 홍보를 위해 진행하는 무료 특강입니다.<br />아래 신청서를 작성해주시면 특강 안내를 드립니다.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-canvas rounded-[18px] p-8 border border-hairline mb-8">
            <h2 className="text-[21px] font-semibold text-ink mb-2">신청 안내</h2>
            <p className="text-[14px] text-ink-muted mb-6">
              신청서 작성 후, 카카오채널에서{' '}
              <span className="font-semibold text-ink">'신청완료'</span>를 입력해주시면
              특강 참여 방법을 안내해드립니다.
            </p>

            {/* 노션폼 신청 버튼 */}
            <div className="w-full rounded-[12px] border border-hairline bg-pearl px-6 py-8 text-center">
              <a
                href="https://sunrise-wisteria-5ca.notion.site/f693a65dd06543e1b98fbac559dfc758"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white text-[17px] hover:bg-primary-dark transition-colors active:scale-95"
              >
                신청서 작성하기
              </a>
              <p className="text-[12px] text-ink-light mt-4">
                노션 계정이 없어도 신청 가능합니다.
              </p>
            </div>
          </div>

          <div className="bg-canvas rounded-[18px] p-6 border border-hairline">
            <p className="text-[14px] font-semibold text-ink mb-2">📌 신청 절차</p>
            <ol className="flex flex-col gap-2 text-[14px] text-ink-muted leading-relaxed">
              <li>1. 위 신청서를 작성합니다.</li>
              <li>
                2. 카카오채널에서{' '}
                <span className="font-semibold text-ink">'신청완료'</span>를 입력합니다.
              </li>
              <li>3. 특강 일정 및 참여 방법을 안내받습니다.</li>
            </ol>

            <div className="mt-6 pt-5 border-t border-hairline">
              <a
                href="http://pf.kakao.com/_gngTX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEE500] text-[#3C1E1E] text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                카카오채널 바로가기
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

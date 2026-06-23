export default function FreeLecturePage() {
  return (
    <>
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-[14px] font-semibold text-white/70 mb-2 tracking-wide">SOSOSOOP</p>
          <h1 className="text-[40px] font-semibold tracking-tight text-white mb-4">
            무료특강 신청
          </h1>
          <p className="text-[17px] text-white/80 leading-[1.47] max-w-[480px] mx-auto">
            소소숲 정규 강의 홍보를 위해 진행하는 무료 특강입니다. 아래 신청서를 작성해주시면 특강 안내를 드립니다.
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

            {/* 노션폼 임베드 */}
            <div className="w-full rounded-[12px] overflow-hidden border border-hairline bg-pearl min-h-[600px] flex items-center justify-center">
              <div className="text-center px-6 py-12">
                <p className="text-[17px] font-semibold text-ink mb-3">노션 신청서</p>
                <p className="text-[14px] text-ink-muted mb-6">
                  아래 버튼을 눌러 노션 신청서를 작성해주세요.
                </p>
                <a
                  href="https://YOUR_NOTION_FORM_URL"
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
                href="https://pf.kakao.com/_YOUR_CHANNEL"
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

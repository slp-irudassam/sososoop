import Image from 'next/image';
import Link from 'next/link';

const values = [
  { title: '성장', desc: '완벽함보다 꾸준함. 어제보다 조금 더 나아지는 것', emoji: '🌱' },
  { title: '기록', desc: '배움은 기록될 때 자산이 된다', emoji: '📝' },
  { title: '나눔', desc: '배움은 나눌수록 커진다', emoji: '🤝' },
  { title: '실천', desc: '아는 것보다 해보는 것이 중요하다', emoji: '✨' },
  { title: '따뜻함', desc: '경쟁보다 응원. 비교보다 성장', emoji: '🌿' },
];

export default function AboutPage() {
  return (
    <>
      {/* 히어로 */}
      <section className="bg-tile-dark py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="소소숲 로고" width={80} height={80} className="invert opacity-90" />
          </div>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-on-dark mb-5">
            소소숲:지혜의 기록소
          </h1>
          <p className="text-[21px] text-primary-on-dark mb-6">
            작은 것이 자라서 특별한 것이 됩니다.
          </p>
          <p className="text-[17px] text-on-dark/70 leading-[1.47] max-w-[560px] mx-auto">
            언어재활사와 교육 전문가들이 배움과 기록을 통해 함께 성장하는 따뜻한 지식 공동체입니다.
          </p>
        </div>
      </section>

      {/* 운영자 소개 */}
      <section className="bg-parchment py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[34px] font-semibold tracking-tight text-ink mb-10">운영자 소개</h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-none text-4xl">
              🌲
            </div>
            <div>
              <h3 className="text-[21px] font-semibold text-ink mb-2">이루다쌤 (이승윤)</h3>
              <p className="text-[14px] text-primary font-semibold mb-4">
                언어재활사 · AI 활용 강사 · 교육 콘텐츠 제작자
              </p>
              <p className="text-[17px] text-ink-muted leading-[1.47] mb-4">
                임상 현장에서 일하면서 "더 효율적으로 일하고, 더 잘 기록하고, 더 잘 나눌 수 없을까"라는 질문을 품었습니다.
              </p>
              <p className="text-[17px] text-ink-muted leading-[1.47]">
                AI 도구를 활용해 임상 업무를 효율화하고, 그 경험을 콘텐츠로 만들어 나누고 있습니다. 소소숲은 그 여정의 기록입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 */}
      <section className="bg-canvas py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[34px] font-semibold tracking-tight text-ink mb-6">미션</h2>
          <blockquote className="border-l-4 border-primary pl-6 mb-8">
            <p className="text-[21px] text-ink leading-relaxed italic">
              "혼자 공부하면 쉽게 지치지만, 함께 기록하고 나누면 더 오래, 더 멀리 갈 수 있다."
            </p>
          </blockquote>
          <p className="text-[17px] text-ink-muted leading-[1.47]">
            배움, 기록, 나눔을 통해 함께 성장하는 공간을 만듭니다. 언어재활사와 교육 전문가들이 AI를 활용하여 더 효율적으로 일하고 성장하도록 돕는 것이 소소숲의 미션입니다.
          </p>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="bg-parchment py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[34px] font-semibold tracking-tight text-ink mb-10">핵심 가치</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-canvas rounded-[18px] p-6 border border-hairline">
                <span className="text-3xl mb-4 block">{v.emoji}</span>
                <h3 className="text-[17px] font-semibold text-ink mb-2">{v.title}</h3>
                <p className="text-[14px] text-ink-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tile-dark py-20 px-6 text-center">
        <h2 className="text-[34px] font-semibold text-on-dark mb-4">함께 성장을 시작하세요.</h2>
        <p className="text-[17px] text-on-dark/70 mb-8">
          강의, 자료, 무료특강으로 소소숲을 경험해보세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/lectures"
            className="px-6 py-3 rounded-full bg-primary text-white text-[17px] hover:bg-primary-dark transition-colors"
          >
            강의 보러가기
          </Link>
          <Link
            href="/free-lecture"
            className="px-6 py-3 rounded-full border border-on-dark/30 text-on-dark text-[17px] hover:border-on-dark/60 transition-colors"
          >
            무료특강 신청
          </Link>
        </div>
      </section>
    </>
  );
}

const text =
  '소소숲:지혜의 기록소 · 소소하지만 소중한 것들이 모여 숲을 이룹니다 · 배움 · 기록 · 나눔 · 성장 · ';

export default function MarqueeBanner() {
  const repeated = text.repeat(6);

  return (
    <section className="bg-primary overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-[14px] font-semibold text-white/90 tracking-wide pr-0">
          {repeated}
        </span>
        <span className="text-[14px] font-semibold text-white/90 tracking-wide pr-0" aria-hidden>
          {repeated}
        </span>
      </div>
    </section>
  );
}

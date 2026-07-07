import { Fragment } from 'react';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  intro?: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, effectiveDate, intro, sections }: LegalPageProps) {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-tile-dark py-16 px-6">
        <div className="max-w-[760px] mx-auto">
          <h1 className="text-[34px] md:text-[40px] font-semibold tracking-tight text-on-dark mb-3">
            {title}
          </h1>
          <p className="text-[13px] text-on-dark/50">시행일: {effectiveDate}</p>
        </div>
      </section>

      {/* 본문 */}
      <section className="bg-parchment py-12 px-6">
        <div className="max-w-[760px] mx-auto bg-canvas rounded-[18px] p-8 md:p-10 border border-hairline">
          {intro && (
            <p className="text-[15px] text-ink-muted leading-[1.7] mb-8">{intro}</p>
          )}

          <div className="flex flex-col gap-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-[17px] font-semibold text-ink mb-3">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.blocks.map((block, j) => (
                    <Fragment key={j}>
                      {block.type === 'p' ? (
                        <p className="text-[14px] text-ink-muted leading-[1.7]">
                          {block.text}
                        </p>
                      ) : (
                        <ul className="flex flex-col gap-1.5">
                          {block.items.map((item, k) => (
                            <li
                              key={k}
                              className="flex items-start gap-2 text-[14px] text-ink-muted leading-[1.7]"
                            >
                              <span className="text-primary/60 mt-0.5 shrink-0">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

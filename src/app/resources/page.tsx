import { freeResources, paidResources } from '@/data/resources';
import ResourceTabs from '@/components/ResourceTabs';

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-parchment py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[14px] font-semibold text-primary mb-2">자료실</p>
          <h1 className="text-[40px] font-semibold tracking-tight text-ink mb-4">
            소소숲 자료실
          </h1>
          <p className="text-[17px] text-ink-muted leading-[1.47]">
            임상 현장에서 바로 쓸 수 있는 자료를 제공합니다.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-12 px-6">
        <div className="max-w-[1000px] mx-auto">
          <ResourceTabs freeResources={freeResources} paidResources={paidResources} />
        </div>
      </section>
    </>
  );
}

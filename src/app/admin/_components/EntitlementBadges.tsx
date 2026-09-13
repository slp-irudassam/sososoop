import { ENTITLEMENT_PRODUCTS, type EntitlementAlias } from '@/lib/entitlements';
import type { EntitlementSource } from '@/lib/admin-data';

const SOURCE_LABEL: Record<EntitlementSource, string> = { paid: '결제', granted: '지급' };

export default function EntitlementBadges({
  entitlements,
}: {
  entitlements: Record<EntitlementAlias, EntitlementSource[]>;
}) {
  const owned = ENTITLEMENT_PRODUCTS.filter(({ alias }) => entitlements[alias].length > 0);
  if (owned.length === 0) return <span className="text-[12px] text-ink-light">없음</span>;

  return (
    <div className="flex flex-wrap gap-1.5">
      {owned.map(({ alias, label }) => (
        <span
          key={alias}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[12px] font-medium whitespace-nowrap"
        >
          {label}
          <span className="text-primary/60">
            {entitlements[alias].map((s) => SOURCE_LABEL[s]).join('+')}
          </span>
        </span>
      ))}
    </div>
  );
}

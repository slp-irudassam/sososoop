'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-[1120px] mx-auto px-6 py-12">
      <div className="bg-pearl border border-hairline rounded-[18px] p-8">
        <h1 className="text-[18px] font-semibold text-ink mb-2">작업을 완료하지 못했어요</h1>
        <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
          {error.message || '잠시 후 다시 시도해 주세요.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 rounded-full bg-primary text-white text-[14px] font-medium hover:bg-primary-dark transition-colors"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}

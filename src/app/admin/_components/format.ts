// 관리자 화면 표기 헬퍼.

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatWon(amount: number | null | undefined): string {
  return `${(amount ?? 0).toLocaleString('ko-KR')}원`;
}

const PROVIDER_LABELS: Record<string, string> = { google: '구글', kakao: '카카오' };

export function providerLabel(providers: string[]): string {
  return providers.map((p) => PROVIDER_LABELS[p] ?? p).join('·') || '-';
}

const ORDER_STATUS: Record<string, { label: string; className: string }> = {
  DONE: { label: '결제완료', className: 'bg-primary/10 text-primary' },
  WAITING_FOR_DEPOSIT: { label: '입금대기', className: 'bg-amber-50 text-amber-700' },
  CANCELED: { label: '취소·환불', className: 'bg-stone-100 text-ink-light' },
};

export function orderStatus(status: string | null) {
  return (
    ORDER_STATUS[status ?? ''] ?? { label: status ?? '-', className: 'bg-stone-100 text-ink-muted' }
  );
}

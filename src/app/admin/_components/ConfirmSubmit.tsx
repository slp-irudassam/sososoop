'use client';

import { useFormStatus } from 'react-dom';

// 되돌리기 어려운 관리자 작업용 제출 버튼 — 누르면 확인창을 먼저 띄운다.
export default function ConfirmSubmit({
  message,
  children,
  tone = 'default',
}: {
  message?: string;
  children: React.ReactNode;
  tone?: 'default' | 'primary' | 'danger';
}) {
  const { pending } = useFormStatus();

  const toneClass = {
    default: 'border border-hairline bg-canvas text-ink hover:border-primary/50',
    primary: 'bg-primary text-white hover:bg-primary-dark',
    danger: 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
  }[tone];

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (message && !window.confirm(message)) e.preventDefault();
      }}
      className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors disabled:opacity-50 ${toneClass}`}
    >
      {pending ? '처리 중…' : children}
    </button>
  );
}

'use client';

import { useState } from 'react';

type AccountCopyProps = {
  bank: string;
  number: string;
  holder: string;
};

export default function AccountCopy({ bank, number, holder }: AccountCopyProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      // 클립보드 API를 쓸 수 없는 환경 대비 폴백
      const el = document.createElement('textarea');
      el.value = number;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-primary/8 rounded-[12px] p-5 mb-6 border border-primary/20">
      <p className="text-[14px] font-semibold text-ink mb-3">💳 입금 계좌</p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[17px] font-semibold text-ink">
            {bank} {number}
          </p>
          <p className="text-[14px] text-ink-muted mt-1">예금주: {holder}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="계좌번호 복사"
          className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors active:scale-95 ${
            copied
              ? 'bg-primary text-white'
              : 'bg-canvas text-ink border border-primary/30 hover:bg-primary/10'
          }`}
        >
          {copied ? '복사됨 ✓' : '계좌 복사'}
        </button>
      </div>
    </div>
  );
}

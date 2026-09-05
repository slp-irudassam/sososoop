'use client';

import { useEffect, useState } from 'react';

// 1계정 = 1기기. 이 브라우저의 기기 식별자(localStorage)를 서버에 보내 바인딩/검증한 뒤
// 통과하면 CBT 앱(iframe)을 띄운다. 다른 기기면 안내를 보여준다.
const DEVICE_KEY = 'slp_cbt_device_id';

function getDeviceId(): string {
  let d = localStorage.getItem(DEVICE_KEY);
  if (!d) {
    d =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `dev-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    localStorage.setItem(DEVICE_KEY, d);
  }
  return d;
}

type State = 'checking' | 'ok' | 'conflict' | 'error';

export default function DeviceGate() {
  const [state, setState] = useState<State>('checking');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const deviceId = getDeviceId();
        const res = await fetch('/slp-cbt-practice/bind', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ deviceId }),
        });
        if (!alive) return;
        if (res.ok) {
          setState('ok');
        } else if (res.status === 409) {
          setState('conflict');
        } else {
          setState('error');
        }
      } catch {
        if (alive) setState('error');
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (state === 'ok') {
    return (
      <div className="w-full" style={{ height: 'calc(100dvh - 2.75rem)' }}>
        <iframe
          src="/slp-cbt-practice/app"
          title="언어재활사 CBT 연습"
          className="block w-full h-full border-0"
          allow="fullscreen; clipboard-write"
        />
      </div>
    );
  }

  const box = 'w-full max-w-[440px] bg-pearl border border-hairline rounded-[18px] p-8 text-center';

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      {state === 'checking' && (
        <div className={box}>
          <p className="text-[14px] text-ink-muted">이용 환경을 확인하고 있어요…</p>
        </div>
      )}
      {state === 'conflict' && (
        <div className={box}>
          <h1 className="text-[19px] font-bold text-ink mb-2">다른 기기에 등록된 계정이에요</h1>
          <p className="text-[14px] text-ink-muted leading-relaxed">
            이 이용권은 한 대의 기기에서만 사용할 수 있어요.
            <br />
            기기 변경이 필요하면 소소숲 카카오채널로 문의해 주세요.
          </p>
        </div>
      )}
      {state === 'error' && (
        <div className={box}>
          <h1 className="text-[19px] font-bold text-ink mb-2">잠시 문제가 있었어요</h1>
          <p className="text-[14px] text-ink-muted leading-relaxed">
            페이지를 새로고침해 주세요. 계속 안 되면 문의해 주세요.
          </p>
        </div>
      )}
    </main>
  );
}

// CBT 기기 바인딩/검증 — 로그인+결제 확인 후, 이 유저에 기기를 1대만 묶는다.
// 최초면 등록, 같은 기기면 통과, 다른 기기면 409. 통과 시 /app 라우트가 확인할
// httpOnly 쿠키(slp_cbt_dev)를 심어 직접 접근(iframe 우회)도 기기 일치를 요구한다.
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { hasCbtEntitlement } from '@/lib/entitlements';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, reason: 'auth' }, { status: 401 });

  const entitled = await hasCbtEntitlement(user.id);
  if (!entitled) return NextResponse.json({ ok: false, reason: 'unpaid' }, { status: 403 });

  let deviceId = '';
  try {
    const body = (await request.json()) as { deviceId?: string };
    deviceId = String(body.deviceId ?? '').slice(0, 100);
  } catch {
    // no-op
  }
  if (!deviceId) return NextResponse.json({ ok: false, reason: 'bad_request' }, { status: 400 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, reason: 'server' }, { status: 500 });

  const { data: existing } = await admin
    .from('cbt_access')
    .select('device_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!existing) {
    // 최초 접근 → 이 기기를 등록
    const { error } = await admin
      .from('cbt_access')
      .insert({ user_id: user.id, device_id: deviceId });
    if (error) return NextResponse.json({ ok: false, reason: 'server' }, { status: 500 });
  } else if (existing.device_id !== deviceId) {
    // 다른 기기 → 차단
    return NextResponse.json({ ok: false, reason: 'device' }, { status: 409 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('slp_cbt_dev', deviceId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/slp-cbt-practice',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

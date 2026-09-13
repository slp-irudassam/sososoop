// service_role 키가 없는 환경(주로 로컬 개발)에서의 안내.
export default function ServiceKeyMissing() {
  return (
    <main className="max-w-[1120px] mx-auto px-6 py-12">
      <div className="bg-pearl border border-hairline rounded-[18px] p-8 text-[14px] text-ink-muted leading-relaxed">
        회원 데이터를 읽으려면 서버에{' '}
        <code className="px-1.5 py-0.5 rounded bg-canvas text-[13px]">SUPABASE_SERVICE_ROLE_KEY</code>가
        필요합니다. 운영 사이트(Cloudflare secret)에는 설정되어 있고, 로컬에서는 .env.local에 넣어야 보입니다.
      </div>
    </main>
  );
}

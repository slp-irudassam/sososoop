// 이미지 파일을 questions.js의 image 필드용 data URI로 바꿔 출력한다.
// 번들은 문항 데이터를 인라인하므로 data URI로 넣으면 이미지도 로그인·결제 게이트 뒤에 남는다(URL 노출 없음).
// 사용:  node scripts/img-to-data-uri.mjs "/path/to/그림.png"        → data URI 출력
//        node scripts/img-to-data-uri.mjs "/path/to/그림.png" --copy  → 클립보드로 복사(macOS)
// 권장: PNG/WebP, 긴 변 1600px 이하, 200KB 이하(번들 용량). SVG는 그대로 넣어도 됨.
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { execSync } from 'node:child_process';
const file = process.argv[2];
if (!file) { console.error('사용: node scripts/img-to-data-uri.mjs <이미지파일> [--copy]'); process.exit(1); }
const mime = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.svg':'image/svg+xml' }[extname(file).toLowerCase()];
if (!mime) { console.error('지원 형식: png/jpg/webp/gif/svg'); process.exit(1); }
const buf = readFileSync(file);
const uri = `data:${mime};base64,${buf.toString('base64')}`;
if (process.argv.includes('--copy')) { execSync('pbcopy', { input: uri }); console.error(`클립보드 복사 완료 (${(buf.length/1024).toFixed(0)} KB 원본 → ${(uri.length/1024).toFixed(0)} KB)`); }
else { process.stdout.write(uri + '\n'); console.error(`(${(buf.length/1024).toFixed(0)} KB 원본 → ${(uri.length/1024).toFixed(0)} KB data URI)`); }

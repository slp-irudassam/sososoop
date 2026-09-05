// CBT 연습앱(index.html + questions.js)을 로그인프리 단일 HTML로 묶어
// src/app/slp-cbt-practice/app-html.json (JSON 문자열)로 저장한다.
//
// - Firebase 스크립트 4줄 제거 → window.FIREBASE_CONFIG 미정의 → 앱이 enterApp('local')로
//   자체 로그인 없이 실행(게이팅은 소소숲 라우트가 담당).
// - questions.js 내용을 인라인 → 문항 소스가 별도 URL로 노출되지 않게(전체 게이트 뒤).
//
// 문항을 고친 뒤 재생성:  node scripts/build-cbt-bundle.mjs
// 소스 경로 지정:        node scripts/build-cbt-bundle.mjs "/path/to/kcbt-practice"
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SRC_DIR =
  process.argv[2] || '/Users/irudassam/클로드/kcbt-practice';
const OUT = join(__dirname, '..', 'src', 'app', 'slp-cbt-practice', 'app-html.json');

let html = readFileSync(join(SRC_DIR, 'index.html'), 'utf8');
const questions = readFileSync(join(SRC_DIR, 'questions.js'), 'utf8');

// 1) Firebase 관련 <script> 4줄 제거(로그인프리 모드로 전환)
html = html
  .replace(/^.*firebasejs\/.*$\n?/gm, '')
  .replace(/^.*src="firebase-config\.js".*$\n?/gm, '')
  .replace(/^\s*<!--\s*Firebase.*-->\s*$\n?/gm, '');

// 2) questions.js 외부 참조 → 인라인
const before = html;
html = html.replace(
  /<script\s+src="questions\.js"><\/script>/,
  `<script>\n${questions}\n</script>`,
);
if (html === before) throw new Error('questions.js <script> 태그를 찾지 못함 — index.html 구조 확인 필요');

// 3) 잔여 firebase-config.js 참조가 없는지 안전 점검
if (/firebase-config\.js|firebasejs\//.test(html)) {
  throw new Error('Firebase 참조가 남아있음 — 제거 로직 확인 필요');
}

writeFileSync(OUT, JSON.stringify(html), 'utf8');
console.log(`OK  ${OUT}  (${(html.length / 1024).toFixed(0)} KB HTML)`);

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const dir = __dirname;
  const outDir = path.join(dir, 'png');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const files = fs.readdirSync(dir)
    .filter(f => f.match(/^card-\d+\.html$/))
    .sort();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });

  for (const file of files) {
    const filePath = path.join(dir, file);
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(800);
    const out = path.join(outDir, file.replace('.html', '.png'));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    console.log(`✓ ${file} → png/${file.replace('.html', '.png')}`);
  }

  await browser.close();
  console.log(`\n완료! ${files.length}장 저장됨 → cardnews/png/`);
})();

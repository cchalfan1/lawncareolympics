// Renders app/opengraph-image.png (1200×630). Requires puppeteer
// (npm i -D puppeteer, or run from an env that has it). Template mirrors
// lawnly2 ui/scripts/generate-og-image.mjs — keep the two in sync.
//
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;800;900&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 1200px; height: 630px; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background:
        radial-gradient(ellipse at 80% 20%, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0) 55%),
        radial-gradient(ellipse at 15% 85%, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0) 55%),
        linear-gradient(180deg, #0a0f0d 0%, #0d1a12 50%, #091510 100%);
      color: #e2e8f0;
      position: relative;
      overflow: hidden;
    }
    .frame {
      position: absolute;
      inset: 32px;
      border: 1px solid rgba(251,191,36,0.25);
      border-radius: 24px;
      padding: 56px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .row { display: flex; align-items: center; gap: 14px; }
    .brand {
      color: #94a3b8; font-size: 18px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
    }
    .brand-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: linear-gradient(135deg, #4ade80 0%, #16a34a 100%);
    }
    .pill {
      display: inline-flex; align-items: center; gap: 10px;
      background: rgba(251,191,36,0.12);
      border: 1px solid rgba(251,191,36,0.4);
      border-radius: 100px; padding: 10px 22px;
      font-size: 18px; font-weight: 800; color: #fbbf24;
      letter-spacing: 0.1em; text-transform: uppercase; align-self: flex-start;
    }
    h1 {
      font-size: 96px; font-weight: 900; line-height: 0.96;
      letter-spacing: -0.03em; color: #f8fafc; margin: 18px 0 22px;
    }
    h1 .gold {
      background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .tagline { font-size: 30px; font-weight: 700; color: #cbd5e1; letter-spacing: -0.005em; }
    .meta {
      display: flex; align-items: center; gap: 32px;
      color: #94a3b8; font-size: 22px; font-weight: 600;
    }
    .meta b { color: #f8fafc; font-weight: 800; letter-spacing: -0.01em; }
    .meta .sep { width: 5px; height: 5px; border-radius: 50%; background: rgba(251,191,36,0.55); }
  </style>
</head>
<body>
  <div class="frame">
    <div>
      <div class="row" style="margin-bottom: 28px;">
        <div class="brand-dot"></div>
        <div class="brand">Presented by Lawnly</div>
      </div>
      <div class="pill">🏆 First Annual · September 20, 2026</div>
      <h1>The <span class="gold">Lawn&nbsp;Care</span><br/>Olympics</h1>
      <div class="tagline">150 operators. 5 events. One champion.</div>
    </div>
    <div class="meta">
      <span><b>Sep 20, 2026</b></span>
      <span class="sep"></span>
      <span><b>Fayetteville, AR</b></span>
      <span class="sep"></span>
      <span>Registration <b>is open</b></span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png', omitBackground: false });
  const out = new URL('../app/opengraph-image.png', import.meta.url).pathname;
  await writeFile(out, buf);
  console.log(`wrote ${out} (${buf.length} bytes)`);
} finally {
  await browser.close();
}
process.exit(0);

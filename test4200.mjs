import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  const errs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => errs.push(e.message));

  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const root = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 1000) || 'EMPTY');
  const text = await page.evaluate(() => document.body.innerText.substring(0, 500));

  console.log('=== PAGE ERRORS ===');
  errs.forEach(e => console.log(e));
  console.log('\n=== CONSOLE LOGS ===');
  logs.forEach(l => console.log(l));
  console.log('\n=== ROOT INNER HTML (first 1000 chars) ===');
  console.log(root);
  console.log('\n=== BODY TEXT (first 500 chars) ===');
  console.log(text);

  await browser.close();
})();

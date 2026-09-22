const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('https://axiom-power-template.webflow.io/contact', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/ref-full.png', fullPage: true });

  await page.goto('https://axiom-power-template.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/ref-home-full.png', fullPage: true });

  await browser.close();
})();

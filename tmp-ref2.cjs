const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('https://axiom-power-template.webflow.io/', { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(2000);

  const altura = await page.evaluate(() => document.body.scrollHeight);
  const passos = Math.ceil(altura / 1000);
  for (let i = 0; i < Math.min(passos, 8); i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 1000);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/ref-scroll-${i}.png` });
  }

  await browser.close();
})();

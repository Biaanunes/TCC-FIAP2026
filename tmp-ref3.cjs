const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('https://axiom-power-template.webflow.io/contact', { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/contact-0.png' });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/contact-1.png' });
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/private/tmp/claude-502/-Users-beatriznunes-projeto-tcc/be108978-4747-415f-9a90-e30284e3edfd/scratchpad/contact-2.png' });
  await browser.close();
})();

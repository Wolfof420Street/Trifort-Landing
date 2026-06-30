const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: '/home/wolfof420street/.gemini/antigravity-ide/brain/21431759-4ceb-4dec-9aaa-27f2b5ceeae4/before_home.png', fullPage: true });

  await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: '/home/wolfof420street/.gemini/antigravity-ide/brain/21431759-4ceb-4dec-9aaa-27f2b5ceeae4/before_about.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured successfully");
})();

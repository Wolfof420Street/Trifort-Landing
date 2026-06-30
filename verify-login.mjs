import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  let hasError = false;
  page.on('pageerror', err => { console.error('Page error:', err); hasError = true; });
  page.on('console', msg => { if (msg.type() === 'error') { console.error('Console error:', msg.text()); hasError = true; } });

  try {
    console.log('Navigating to http://localhost:3000/admin/login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle0' });
    
    // Fill login form
    console.log('Typing credentials...');
    await page.type('#email', 'admin@trifort.site');
    await page.type('#password', 'SuperSecretPassword123!');
    
    // Click submit and wait for navigation
    console.log('Submitting...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button[type="submit"]')
    ]);

    const url = page.url();
    console.log('Final URL:', url);
    
    if (url.includes('/admin/dashboard')) {
      console.log('Verification passed: Redirect to dashboard successful.');
      process.exit(0);
    } else {
      console.error('Verification failed: Not on dashboard. URL is', url);
      process.exit(1);
    }
  } catch (error) {
    console.error('Failed test:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

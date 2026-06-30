import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Track console errors
  let hasError = false;
  page.on('pageerror', err => {
    console.error('Page error:', err);
    hasError = true;
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Console error:', msg.text());
      hasError = true;
    }
  });

  try {
    console.log('Navigating to http://localhost:3000/admin/login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle0' });
    
    // Check if there is a redirect loop
    const url = page.url();
    console.log('Final URL:', url);
    
    if (hasError) {
      console.error('Verification failed: Errors found during load.');
      process.exit(1);
    } else {
      console.log('Verification passed: No console errors, page loaded successfully.');
      process.exit(0);
    }
  } catch (error) {
    console.error('Failed to load page:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

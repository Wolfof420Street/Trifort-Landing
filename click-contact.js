const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        // Capture console messages
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        
        await page.goto('http://localhost:3001');
        
        console.log("Clicking Contact link...");
        // Wait for the link
        await page.waitForSelector('a[href="/contact"]');
        
        // Evaluate click
        await page.evaluate(() => {
            document.querySelector('a[href="/contact"]').click();
        });
        
        // Wait a bit to see if route changes or errors are thrown
        await new Promise(r => setTimeout(r, 3000));
        
        console.log("Current URL:", page.url());
        
        await browser.close();
    } catch (e) {
        console.error("Test Error:", e);
    }
})();

const puppeteer = require('puppeteer');
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        console.log("Checking Homepage...");
        await page.goto('http://localhost:3001');
        await wait(1000);
        
        // Scroll down a bit to trigger intersection observer
        await page.evaluate(() => {
            window.scrollBy(0, 1000);
        });
        await wait(1000);
        
        const homepageReveals = await page.evaluate(() => {
            const reveals = document.querySelectorAll('.reveal');
            const visibleCount = document.querySelectorAll('.reveal.visible').length;
            
            // Check opacity of a visible element
            let opacityCheck = "N/A";
            const firstVisible = document.querySelector('.reveal.visible');
            if (firstVisible) {
                opacityCheck = window.getComputedStyle(firstVisible).opacity;
            }
            
            return { total: reveals.length, visible: visibleCount, sampleOpacity: opacityCheck };
        });
        console.log("Homepage Results:", homepageReveals);
        
        console.log("Checking Services Page...");
        await page.goto('http://localhost:3001/services');
        await wait(1000);
        await page.evaluate(() => {
            window.scrollBy(0, 1000);
        });
        await wait(1000);
        
        const servicesReveals = await page.evaluate(() => {
            const reveals = document.querySelectorAll('.reveal');
            const visibleCount = document.querySelectorAll('.reveal.visible').length;
            return { total: reveals.length, visible: visibleCount };
        });
        console.log("Services Page Results:", servicesReveals);
        
        await browser.close();
    } catch (e) {
        console.error("Error:", e);
    }
})();

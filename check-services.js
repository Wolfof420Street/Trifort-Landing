const puppeteer = require('puppeteer');
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        console.log("Checking Services Page...");
        await page.goto('http://localhost:3001/services', { waitUntil: 'networkidle2' });
        await wait(1000);
        await page.evaluate(() => {
            window.scrollBy(0, 1000);
        });
        await wait(1000);
        
        const servicesReveals = await page.evaluate(() => {
            const reveals = document.querySelectorAll('.reveal');
            const visibleCount = document.querySelectorAll('.reveal.visible').length;
            let opacityCheck = "N/A";
            const firstVisible = document.querySelector('.reveal.visible');
            if (firstVisible) {
                opacityCheck = window.getComputedStyle(firstVisible).opacity;
            }
            return { total: reveals.length, visible: visibleCount, sampleOpacity: opacityCheck };
        });
        console.log("Services Page Results:", servicesReveals);
        
        await browser.close();
    } catch (e) {
        console.error("Error:", e);
    }
})();

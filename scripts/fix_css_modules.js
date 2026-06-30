const fs = require('fs');
const path = require('path');

function cleanCSS(filePath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');

    // 1. Remove everything before the first .hero {
    const heroIndex = css.indexOf('.hero {');
    if (heroIndex !== -1) {
        css = css.substring(heroIndex);
    }

    // 2. Fix background URLs
    css = css.replace(/url\(['"]?construction-website\/frontend\/images\/[^'")]*['"]?\)/g, "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')");
    css = css.replace(/url\(['"]?https:[^'")]*['"]?\)/g, (match) => match.replace(/'/g, '"')); // Ensure valid quotes or just leave as is, but we replaced with '' so it's fine.

    // 3. Neutralize any stray body, html, or * selectors that might be hiding inside @media queries
    css = css.replace(/\bbody\s*\{/g, '.body-dummy {');
    css = css.replace(/\bhtml\s*\{/g, '.html-dummy {');
    css = css.replace(/\*\s*\{/g, '.star-dummy {');

    fs.writeFileSync(filePath, css);
    console.log("Cleaned " + filePath);
}

cleanCSS('src/app/page.module.css');
cleanCSS('src/app/services/services.module.css');

const fs = require('fs');

const html = fs.readFileSync('scratch/legacy_index_content.html', 'utf8');

// We want the content from <div class="hero"> to the end, before footer
let start = html.indexOf('<div class="hero">');
if (start === -1) {
    // maybe it's <section class="hero"> ?
    start = html.indexOf('<section class="hero">');
}

let end = html.indexOf('<footer class="footer">');

let bodyContent = html.substring(start, end);

// Convert class to className
bodyContent = bodyContent.replace(/class="/g, 'className="');

// Fix unclosed tags
bodyContent = bodyContent.replace(/<img([^>]*[^/])>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<br>/g, '<br />');

// Fix inline styles
// Example: style="background-image:url('...');background-color:#142a1e;"
// Simple fix: remove inline styles and we will manually fix or let it be for now (actually React will crash on string styles)
// We'll replace style="([^"]*)" with a basic conversion
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    const rules = styleString.split(';').filter(Boolean);
    const styleObj = {};
    for (const rule of rules) {
        let [key, value] = rule.split(':');
        if (!key || !value) continue;
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = value.trim();
    }
    return `style={${JSON.stringify(styleObj)}}`;
});

// Write to a temporary JSX file so I can review and inject it
fs.writeFileSync('scratch/page_content.tsx', bodyContent);
console.log("Written to scratch/page_content.tsx");

const fs = require('fs');
const path = require('path');

const legacyDir = path.join(__dirname, 'legacy');
const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.html'));

const selectorMap = {};

files.forEach(file => {
    const content = fs.readFileSync(path.join(legacyDir, file), 'utf-8');
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    
    if (styleMatch) {
        const css = styleMatch[1];
        // Remove comments
        const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
        // Extract block selectors
        // A very basic regex to capture rules: `selector { ... }`
        // We'll split by '}' and then grab the part before '{'
        const rules = noComments.split('}');
        for (const rule of rules) {
            const parts = rule.split('{');
            if (parts.length === 2) {
                const selectors = parts[0]
                    .replace(/\n/g, ' ')
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0 && !s.startsWith('@'));
                
                for (const selector of selectors) {
                    if (!selectorMap[selector]) {
                        selectorMap[selector] = [];
                    }
                    if (!selectorMap[selector].includes(file)) {
                        selectorMap[selector].push(file);
                    }
                }
            }
        }
    }
});

const collisions = Object.entries(selectorMap)
    .filter(([selector, files]) => files.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

console.log("COLLISIONS IN LEGACY CSS:");
for (const [selector, files] of collisions) {
    if (selector.startsWith('.') || selector.startsWith('#')) {
        console.log(`- ${selector} : ${files.join(', ')}`);
    }
}

const fs = require('fs');

function fixFile(filePath, addImport) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if we need to add import Link from "next/link";
    if (addImport && !content.includes('import Link from "next/link"')) {
        content = 'import Link from "next/link";\n' + content;
    }

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Find href="something.html" or href="something.html#QFORM"
        if (line.includes('href="') && line.includes('.html')) {
            // Replace `href="about.html"` with `href="/about"`
            line = line.replace(/href="([a-zA-Z0-9_-]+)\.html(#?[a-zA-Z0-9_-]*)"/g, 'href="/$1$2"');
            
            // Now replace `<a ` with `<Link ` and `</a>` with `</Link>`
            line = line.replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>');
            
            lines[i] = line;
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
}

fixFile('src/app/page.tsx', true);
fixFile('src/app/services/page.tsx', true);
console.log('Fixed links in page.tsx and services/page.tsx');

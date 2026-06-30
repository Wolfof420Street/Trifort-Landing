const fs = require('fs');

function fix(filePath) {
    if (!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf8');

    // Fix style={{'...'}} -> just remove them to fix syntax, we can add them back later if needed, but for now they cause errors
    code = code.replace(/style=\{\{[^}]+\}\}/g, '');
    
    // Fix classname= to className=
    code = code.replace(/classname=/g, 'className=');

    // Fix class"foo"="" to className="foo"
    code = code.replace(/class"([^"]+)"=""/g, 'className="$1"');

    // Fix unclosed tags
    const voidElements = ['img', 'source', 'br', 'hr', 'input', 'meta', 'link'];
    for (const tag of voidElements) {
        const regex = new RegExp(\`<(\${tag})([^>]*?)(?<!/)(?=>)\`, 'g');
        code = code.replace(regex, '<$1$2 /');
    }

    fs.writeFileSync(filePath, code);
}

fix('src/app/page.tsx');
fix('src/app/services/page.tsx');

const fs = require('fs');

function fixJSX(filePath) {
    if (!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf8');

    // Fix unclosed images
    code = code.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
    
    // Fix classname to className
    code = code.replace(/classname=/g, 'className=');

    // Fix bad styles like style={{'fontFamily':''Cormorant Garamond',serif'...}}
    code = code.replace(/style=\{\{'[^']+'\:''[^']+'[^}]+\}\}/g, '');
    
    fs.writeFileSync(filePath, code);
}

fixJSX('src/app/page.tsx');
fixJSX('src/app/services/page.tsx');

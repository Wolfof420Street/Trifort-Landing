const fs = require('fs');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ${styles.reveal} with reveal
    content = content.replace(/\$\{styles\.reveal\}/g, 'reveal');
    
    // Replace ${styles['reveal-delay-X']} with reveal-delay-X
    content = content.replace(/\$\{styles\['reveal-delay-(\d+)'\]\}/g, 'reveal-delay-$1');
    
    // Replace ${styles['from-left']} and from-right
    content = content.replace(/\$\{styles\['from-left'\]\}/g, 'from-left');
    content = content.replace(/\$\{styles\['from-right'\]\}/g, 'from-right');

    fs.writeFileSync(filePath, content);
}

fixFile('src/app/page.tsx');
fixFile('src/app/services/page.tsx');
console.log('Done');

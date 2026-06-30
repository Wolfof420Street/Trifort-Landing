const fs = require('fs');

function applyTo(filePath, moduleName) {
    if (!fs.existsSync(filePath)) return;
    let jsx = fs.readFileSync(filePath, 'utf8');

    // Make sure we have the import
    if (!jsx.includes(`import styles from "${moduleName}"`)) {
        jsx = `import styles from "${moduleName}";\n` + jsx;
    }

    jsx = jsx.replace(/className="([^"]+)"/g, (match, classList) => {
        const classes = classList.split(/\s+/).filter(Boolean);
        if (classes.length === 1) {
            let cls = classes[0];
            if (cls.includes('-')) {
                return `className={styles['${cls}']}`;
            }
            return `className={styles.${cls}}`;
        } else {
            const parts = classes.map(cls => {
                if (cls.includes('-')) {
                    return `styles['${cls}']`;
                }
                return `styles.${cls}`;
            });
            return `className={\`${parts.map(p => `\${${p}}`).join(' ')}\`}`;
        }
    });

    fs.writeFileSync(filePath, jsx);
}

applyTo('src/app/services/page.tsx', './services.module.css');

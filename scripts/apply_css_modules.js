const fs = require('fs');

let jsx = fs.readFileSync('scratch/page_content.tsx', 'utf8');

// replace className="class1 class-2" with className={`${styles.class1} ${styles['class-2']}`}
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

// Wrap it in the React component
const finalCode = `import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import CountUp from "@/components/ui/CountUp";

export const metadata = {
  title: "Trifort Construction | Transparency Through Builds",
  description: "Leading construction company in Kenya specializing in residential homes, commercial buildings, renovations, and project management.",
};

export default function Home() {
  return (
    <>
${jsx}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', finalCode);
console.log("Updated src/app/page.tsx");

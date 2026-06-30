const fs = require('fs');
let code = fs.readFileSync('src/app/services/page.tsx', 'utf8');
code = code.replace(/<video autoplay="" muted="" loop="" playsinline=""/g, '<video autoPlay muted loop playsInline');
fs.writeFileSync('src/app/services/page.tsx', code);

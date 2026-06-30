const fs = require('fs');

function cleanFile(f) {
  let content = fs.readFileSync(f, 'utf8');
  
  // Fix unquoted src
  content = content.replace(/src=([^"\s>]+)/g, 'src="$1"');

  // Fix 1.</i>
  content = content.replace(/1\.<\/i>/g, '1.');
  content = content.replace(/2\.<\/i>/g, '2.');
  content = content.replace(/3\.<\/i>/g, '3.');
  content = content.replace(/4\.<\/i>/g, '4.');

  fs.writeFileSync(f, content);
}

cleanFile('src/app/page.tsx');
cleanFile('scratch/page_content.tsx');

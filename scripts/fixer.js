const fs = require('fs');

function cleanFile(f) {
  let content = fs.readFileSync(f, 'utf8');
  
  // Fix the class"..."="" thing
  content = content.replace(/class"([^"]*)"=""/g, 'className="$1"');

  // Fix the broken style attributes like style={{'backgroundImage':'url('https'}}
  // Let's just completely wipe out any style={{...}} that looks broken
  content = content.replace(/style=\{\{[^}]+\}\}/g, '');
  content = content.replace(/style="[^"]*"/g, ''); // Also remove any remaining raw style=""

  // Fix unclosed images
  content = content.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
  
  // Fix unclosed source
  content = content.replace(/<source([^>]+?)(?<!\/)>/g, '<source$1 />');
  
  // Fix unclosed inputs, br, hr
  content = content.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
  content = content.replace(/<br>/g, '<br />');
  content = content.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');

  // Fix <div ... > without matching </div>?
  // Let's just see if this fixes the compiler errors.
  
  fs.writeFileSync(f, content);
}

cleanFile('src/app/page.tsx');
cleanFile('src/app/services/page.tsx');

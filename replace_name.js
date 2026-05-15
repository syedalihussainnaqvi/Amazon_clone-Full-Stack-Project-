const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

// Patterns to ignore
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.gemini'];
const ignoreFiles = ['replace_name.js', 'package-lock.json', '.env'];
const validExts = ['.js', '.jsx', '.html', '.css', '.json', '.md'];

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        traverseDirectory(fullPath);
      }
    } else {
      if (ignoreFiles.includes(file)) return;
      const ext = path.extname(file);
      if (validExts.includes(ext) || file === '.env') {
        processFile(fullPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // First replace the full name to avoid "SYED Menswear"
  content = content.replace(/Odion Menswear/g, 'SYED');
  content = content.replace(/odion menswear/g, 'syed');
  content = content.replace(/Odion Menswear's/g, "SYED's");

  // Then replace the single words
  content = content.replace(/Odion/g, 'SYED');
  content = content.replace(/odion/g, 'syed');
  content = content.replace(/ODION/g, 'SYED');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

traverseDirectory(directoryPath);
console.log("Done replacing!");

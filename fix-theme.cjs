const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Regex replacements for Tailwind dark mode classes
  // e.g. text-slate-900 dark:text-white -> text-white
  content = content.replace(/\b(?:bg|text|border|hover:border|hover:bg|fill)-[a-zA-Z0-9-/]+\s+dark:((?:bg|text|border|hover:border|hover:bg|fill)-[a-zA-Z0-9-/]+)\b/g, '$1');
  
  // Custom replacements
  content = content.replace(/bg-white\s+dark:bg-slate-900\/50/g, 'bg-slate-900/50');
  content = content.replace(/bg-white\/50\s+dark:bg-slate-950\/50/g, 'bg-slate-950/50');
  content = content.replace(/bg-white\/40\s+dark:bg-slate-950\/40/g, 'bg-slate-950/40');
  content = content.replace(/bg-slate-50\/80\s+dark:bg-slate-950\/80/g, 'bg-slate-950/80');
  content = content.replace(/bg-slate-50\s+dark:bg-slate-950/g, 'bg-slate-950');
  content = content.replace(/bg-white\s+dark:bg-slate-900/g, 'bg-slate-900');
  
  // Specific canvas opacity fixes (lower opacity for visibility)
  content = content.replace(/opacity-30 dark:opacity-100/g, 'opacity-30');
  content = content.replace(/opacity-20 dark:opacity-100/g, 'opacity-20');
  content = content.replace(/opacity-40 dark:opacity-100/g, 'opacity-30');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

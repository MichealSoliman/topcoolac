const fs = require('fs');
const path = require('path');

const directory = 'c:\\Users\\HP\\Desktop\\my-work\\day-2\\topcoolac';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        if (file.includes('node_modules')) return;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else { 
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const htmlFiles = walkDir(directory);
let count = 0;
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Remove preconnects
    content = content.replace(/<link[^>]*href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/g, '');
    content = content.replace(/<link[^>]*href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/g, '');
    
    // Replace Google font stylesheets with local fonts.css
    content = content.replace(/<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?[^>]*>\s*/g, '<link rel="stylesheet" href="/assets/css/fonts.css">\n');
    
    // Remove @imports
    content = content.replace(/@import\s+url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?[^'"]+['"]\);\s*/g, '');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        count++;
    }
});

console.log(`Total files updated: ${count}`);

const fs = require('fs');
const path = require('path');

const directory = 'c:\\Users\\HP\\Desktop\\my-work\\day-2\\topcoolac';
const oldStr = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
const newStr = '/assets/css/all.min.css';

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
    if (content.includes(oldStr)) {
        content = content.replace(new RegExp(oldStr, 'g'), newStr);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        count++;
    }
});

console.log(`Total files updated: ${count}`);

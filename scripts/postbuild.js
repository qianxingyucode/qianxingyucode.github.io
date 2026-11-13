import fs from 'node:fs';
const content = JSON.parse(fs.readFileSync('config/content-en.json', 'utf8'));
const escape = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const html = fs.readFileSync('dist/index.html', 'utf8')
  .replace(/<html lang="[^"]*"/, '<html lang="en"')
  .replace(/<title>.*?<\/title>/, `<title>${escape(content.site.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escape(content.site.description)}"`);
fs.writeFileSync('dist/en.html', html);
fs.writeFileSync('dist/.nojekyll', '');

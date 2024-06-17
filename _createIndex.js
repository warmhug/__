const { resolve, extname } = require('path'),
  { readdir, writeFile } = require('fs').promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

getFiles('./samples/').then(results => {
  const html = `<ul>` +
  results.filter(item => extname(item) === '.html').map(fileOrDirectory =>
    `<li style="margin: 5px 0;">
      <a href="https://warmhug.github.io/__${fileOrDirectory.replace(__dirname, '')}" target="_top">
        https://warmhug.github.io/__${fileOrDirectory.replace(__dirname, '')}
      </a>
    </li>
    `).join('\n') + `</ul>`;

  writeFile('index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samples</title>
</head>
<body>
  <div style="margin: 5px;">
    GitHub 地址 <a href="https://github.com/warmhug/__" target="_top">https://github.com/warmhug/__</a>
  </div>
  ${html}
</body>
</html>`, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

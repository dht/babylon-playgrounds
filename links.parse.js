const fs = require('fs-extra');

const run = () => {
  const content = fs.readJsonSync('links.generated.json', 'utf-8');

  const md = content
    .map((item) => {
      const title = item.split('/').pop();
      return `- [${title}](${item})`;
    })
    .join('\n');

  fs.writeFileSync('links.md', md);
};

run();

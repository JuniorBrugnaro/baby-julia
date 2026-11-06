const fs = require('node:fs/promises');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const config = require('./tailwind.config.cjs');

async function build() {
  const result = await postcss([tailwindcss(config)]).process(
    '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
    { from: undefined }
  );
  await fs.writeFile('dist/tailwind.css', result.css);
}

build().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

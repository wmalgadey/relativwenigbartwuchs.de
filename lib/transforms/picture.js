const Image = require('@11ty/eleventy-img');
const { parseHTML } = require('../linkedom-0.14.24/cjs/index');
const path = require('node:path');

module.exports = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    let { document } = parseHTML(content);
    let parsed = path.parse(outputPath);

    const options = {
      widths: [768, 1280, 1600, 1920, null],
      sizes: '', // your responsive sizes here
      formats: ['webp', 'jpeg'],
      urlPath: '/assets/',
      outputDir: './build/assets/'
    };

    const images = [...document.querySelectorAll('figure img')];

    images.forEach((i, index) => {
      if (i.outerHTML == null) return;

      const src = parsed.dir + '/' + i.getAttribute('src');

      const meta = Image.statsSync(src, options);
      const last = meta.jpeg[meta.jpeg.length - 1];

      if (last.width < 500) return;

      Image(src, options);

      i.setAttribute('width', last.width);
      i.setAttribute('height', last.height);

      if (index !== 0) {
        i.setAttribute('loading', 'lazy');
        i.setAttribute('decoding', 'async');
      }

      i.outerHTML = `
      <picture>
        <source type="image/webp" sizes="${options.sizes}" srcset="${meta.webp.map(p => p.srcset).join(', ')}">
        <source type="image/jpeg" sizes="${options.sizes}" srcset="${meta.jpeg.map(p => p.srcset).join(', ')}">
        ${i.outerHTML}
      </picture>`;
    });

    return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
  }

  return content;
};

const Image = require('@11ty/eleventy-img');
const path = require('node:path');

module.exports = md => {
  // responsive images with 11ty image
  // this overrides the default image renderer
  // titles are also used for size setting
  // ![alt text](/assets/img/image.jpg "title text")
  // title text format:
  // @skip[widthxheight] ?[sizes] caption

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    function figure(html, caption) {
      return `<figure>${html}<figcaption>${caption}</figcaption></figure>`;
    }

    const token = tokens[idx];
    const imgSrc = token.attrGet('src');

    const inputPath = path.parse(env.page.inputPath);
    const outputPath = path.parse(env.page.outputPath);
    const outputDir = path.dirname(path.join(outputPath.dir, imgSrc));
    const urlPath = path.dirname(path.join(env.page.url, imgSrc));

    const imgAlt = token.content;
    const imgTitle = token.attrGet('title');

    const htmlOpts = { alt: imgAlt, loading: 'lazy', decoding: 'async' };

    const parsed = (imgTitle || '').match(
      /^(?<skip>@skip(?:\[(?<width>\d+)x(?<height>\d+)\])? ?)?(?:\?\[(?<sizes>.*?)\] ?)?(?<caption>.*)/
    ).groups;

    if (parsed.skip || imgSrc.startsWith('http')) {
      const options = { ...htmlOpts };

      if (parsed.sizes) {
        options.sizes = parsed.sizes;
      }

      const metadata = { jpeg: [{ url: imgSrc }] };

      if (parsed.width && parsed.height) {
        metadata.jpeg[0].width = parsed.width;
        metadata.jpeg[0].height = parsed.height;
      }

      const generated = Image.generateHTML(metadata, options);

      if (parsed.caption) {
        return figure(generated, parsed.caption);
      }

      return generated;
    }

    const widths = [250, 316, 426, 460, 580, 768];
    const imgOpts = {
      widths: widths
        .concat(widths.map((w) => w * 2)) // generate 2x sizes
        .filter((v, i, s) => s.indexOf(v) === i), // dedupe
      formats: ['webp', 'jpeg'], // TODO: add avif when support is good enough

      urlPath: urlPath,
      outputDir: outputDir,
      filenameFormat: function (hash, src, width, format, options) {
        const { name } = path.parse(src);
        return `${name}-${width}.${format}`;
      }
    };

    const src = path.join(inputPath.dir, imgSrc);

    Image(src, imgOpts);

    const metadata = Image.statsSync(src, imgOpts);

    const generated = Image.generateHTML(metadata, {
      sizes: parsed.sizes || '(max-width: 768px) 100vw, 768px',
      ...htmlOpts
    });

    if (parsed.caption) {
      return figure(generated, parsed.caption);
    }

    return generated;
  }
};

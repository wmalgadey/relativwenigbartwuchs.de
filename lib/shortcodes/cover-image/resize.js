const Image = require('@11ty/eleventy-img');
const fs = require('node:fs');
const path = require('node:path');

const defaultOptions = {
  widths: [300, 550, 800, 1280, 'auto'],
  formats: ['jpeg', 'webp', 'auto'],
};

module.exports = {
  resize: async (imageSrc, inputPath, outputPath, urlPath, options) => {
    if (inputPath == null) {
      options = { imageSubDir: '' };
      urlPath = '';

      inputPath = outputPath = imageSrc;
      imageSrc = path.basename(imageSrc);
    }

    const theOptions = {
      ...defaultOptions,
      ...options,
    };

    const src = path.join(path.dirname(inputPath), theOptions.imageSubDir, imageSrc);

    if (!fs.existsSync(src)) {
      return null;
    }

    const imageMetadata = await Image(src, {
      widths: theOptions.widths,
      formats: theOptions.formats,
      outputDir: path.join(path.dirname(outputPath), theOptions.imageSubDir),
      urlPath: urlPath,
      filenameFormat: (hash, src, width, format) => {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}.${format}`;
      }
    });

    return imageMetadata;
  },
  defaultOptions
};

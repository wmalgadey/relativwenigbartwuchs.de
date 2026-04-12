import Image from '@11ty/eleventy-img';
import fs from 'node:fs';
import path from 'node:path';

const defaultOptions = {
  widths: [300, 550, 800, 1280, 'auto'],
  formats: ['jpeg', 'webp'],
};

export const resize = async (imageSrc, inputPath, outputPath, urlPath, options) => {
  const theOptions = {
    ...defaultOptions,
    ...options,
  };

  const src = path.join(inputPath, imageSrc);

  if (!fs.existsSync(src)) {
    return null;
  }

  outputPath = path.dirname(path.join(outputPath, imageSrc));
  urlPath = path.dirname(path.join(urlPath, imageSrc));

  inputPath = path.dirname(src);
  imageSrc = path.basename(src);

  const imageMetadata = await Image(src, {
    widths: theOptions.widths,
    formats: theOptions.formats,
    outputDir: outputPath,
    urlPath: urlPath,
    filenameFormat: (hash, src, width, format) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}.${format}`;
    }
  });

  return imageMetadata;
};

export { defaultOptions };

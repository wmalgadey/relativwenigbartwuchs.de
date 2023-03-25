const path = require('node:path');
const resizeImage = require('./resize');

const defaultOptions = {
  sizes: '(max-width: 529px) 100vw, 529px',
  className: 'cover-image mx-0',
  imageSubDir: 'images',
};

/** Maps a config of attribute-value pairs to an HTML string
 * representing those same attribute-value pairs.
 */
const stringifyAttributes = (attributeMap) => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      if (typeof value === 'undefined') return '';
      return `${attribute}="${value}"`;
    })
    .join(' ');
};

module.exports = async function (
  imageSrc, alt, options
) {
  const theOptions = {
    ...resizeImage.defaultOptions,
    ...defaultOptions,
    ...options
  };

  const page = theOptions.page ?? this.page;

  if (page == null || page.inputPath == null) {
    return;
  }

  if (imageSrc == null) {
    imageSrc = 'preview.svg';
  }

  const figureAttributes = {
    class: theOptions.className,
  };

  const urlPath = path.join(page.url, theOptions.imageSubDir);

  const imgAttributes = {
    src: path.join(urlPath, imageSrc),
    alt,
    width: 300,
    height: 300,
    srcset: theOptions.widths
      .filter(w => w !== 'auto')
      .map(w => theOptions.formats.filter(w => w !== 'auto').map(f => ({ f, w })))
      .flatMap(r => `${path.join(urlPath, path.basename(imageSrc))}-${r.w}.${r.f} ${r.w}w`)
      .join(', '),
    sizes: theOptions.sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  const imageMetadata = await resizeImage.resize(imageSrc, page.inputPath, page.outputPath, urlPath, theOptions);

  if (imageMetadata != null) {
    const getSmallestImage = (format) => {
      const images = imageMetadata[format];
      return images[0];
    }

    const smallesImage = getSmallestImage(theOptions.formats[0]);

    imgAttributes.src = smallesImage.url;
    imgAttributes.width = smallesImage.width;
    imgAttributes.height = smallesImage.height;
    imgAttributes.srcset = Object
      .values(imageMetadata)
      .flatMap(images => images.map((image) => image.srcset).join(', '));
    imgAttributes.sizes = theOptions.sizes;
    imgAttributes.loading = 'lazy';
    imgAttributes.decoding = 'async';
  }

  return `<figure ${stringifyAttributes(figureAttributes)}><img ${stringifyAttributes(imgAttributes)} /></figure>`;
};

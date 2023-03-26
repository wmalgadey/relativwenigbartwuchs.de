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

  const srcset = resizeImage.defaultOptions.widths
    .filter(w => w !== 'auto')
    .map(w => resizeImage.defaultOptions.formats
      .filter(f => f !== 'auto')
      .map(f => ({ f, w })))
    .flatMap(x => x);

  const filename = (x) => {
    const extension = path.extname(x);
    const name = path.basename(x, extension);

    return name;
  };

  const imgAttributes = {
    src: path.join(urlPath, imageSrc),
    alt,
    width: 1200,
    height: 628,
    srcset: srcset
      .map(r => `${path.join(urlPath, filename(imageSrc))}-${r.w}.${r.f} ${r.w}w`)
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

    const smallestImage = getSmallestImage(theOptions.formats[0]);

    imgAttributes.src = smallestImage.url;
    imgAttributes.width = smallestImage.width;
    imgAttributes.height = smallestImage.height;
    imgAttributes.srcset = Object
      .values(imageMetadata)
      .flatMap(images => images.map((image) => image.srcset).join(', '));
    imgAttributes.sizes = theOptions.sizes;
    imgAttributes.loading = 'lazy';
    imgAttributes.decoding = 'async';
  }

  return `<figure ${stringifyAttributes(figureAttributes)}><img ${stringifyAttributes(imgAttributes)} /></figure>`;
};

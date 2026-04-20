import path from 'node:path';
import * as resizeImage from './resize.js';

const defaultOptions = {
  sizes: '(max-width: 529px) 100vw, 529px',
  className: 'preview-image mx-0'
};

const resizeCache = new Map();

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

const srcset = resizeImage.defaultOptions.widths
    .filter(w => w !== 'auto')
    .map(w => resizeImage.defaultOptions.formats
      .filter(f => f !== 'auto')
      .map(f => ({ f, w })))
    .flatMap(x => x);

const getPreviewFigure = (urlPath, alt) => {
  const src = path.join(urlPath, 'images/preview.svg');
  const url = path.join(urlPath, 'images/preview');

  const imgAttributes = {
    src: src,
    alt,
    width: 1200,
    height: 628,
    srcset: srcset
      .map(r => `${url}-${r.w}.${r.f} ${r.w}w`)
      .join(', '),
    sizes: defaultOptions.sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  const figureAttributes = {
    class: defaultOptions.className + " social-image",
  };

  return `<figure ${stringifyAttributes(figureAttributes)}><img ${stringifyAttributes(imgAttributes)} /></figure>`;
};

export default async function (
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

  const urlPath = page.url;

  if (imageSrc == null) {
    return getPreviewFigure(urlPath, page.title);
  }

  const imgAttributes = {
    src: imageSrc,
    alt,
    width: 1200,
    height: 628,
    srcset: srcset
      .map(r => `${imageSrc}-${r.w}.${r.f} ${r.w}w`)
      .join(', '),
    sizes: defaultOptions.sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  const cacheKey = `${page.url}:${imageSrc}`;
  if (!resizeCache.has(cacheKey)) {
    console.log(`[preview] ${path.basename(imageSrc)}`);
    resizeCache.set(cacheKey, await resizeImage.resize(imageSrc, path.dirname(page.inputPath), path.dirname(page.outputPath), urlPath, theOptions));
  }
  const imageMetadata = resizeCache.get(cacheKey);
  if (imageMetadata != null) {
    const firstFormat = theOptions.formats.filter(f => f !== 'auto').find(f => imageMetadata[f]) ?? Object.keys(imageMetadata)[0];
    const smallestImage = imageMetadata[firstFormat][0];

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

  const figureAttributes = {
    class: theOptions.className,
  };

  return `<figure ${stringifyAttributes(figureAttributes)}><img ${stringifyAttributes(imgAttributes)} /></figure>`;
}

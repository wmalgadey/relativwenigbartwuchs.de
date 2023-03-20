const Image = require('@11ty/eleventy-img');
const path = require('node:path');

const defaultOptions = {
  widths: [300, 550, 800, 1280, 'auto'],
  formats: ['jpeg', 'webp', 'auto'],
  sizes: '(max-width: 529px) 100vw, 529px',
  className: 'cover-image mx-0',
  imageSubDir: 'images',
  placeholder: ''
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
    ...defaultOptions,
    ...options
  };

  if (imageSrc == null) {
    return theOptions.placeholder;
  }

  const page = theOptions.page ?? this.page;

  const src = path.join(path.dirname(page.inputPath), theOptions.imageSubDir, imageSrc);

  const imageMetadata = await Image(src, {
    widths: theOptions.widths,
    formats: theOptions.formats,
    outputDir: path.join(path.dirname(page.outputPath), theOptions.imageSubDir),
    urlPath: path.join(page.url, theOptions.imageSubDir),
    filenameFormat: (hash, src, width, format) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}.${format}`;
    }
  });

  const getSmallestImage = (format) => {
    const images = imageMetadata[format];
    return images[0];
  }

  const smallesImage = getSmallestImage(theOptions.formats[0]);
  const imgAttributes = stringifyAttributes({
    src: smallesImage.url,
    alt,
    width: smallesImage.width,
    height: smallesImage.height,
    srcset: Object
      .values(imageMetadata)
      .flatMap(images => images.map((image) => image.srcset).join(', ')),
    sizes: theOptions.sizes,
    loading: 'lazy',
    decoding: 'async',
  });

  const figureAttributes = stringifyAttributes({
    class: theOptions.className,
  });

  return `<figure ${figureAttributes}><img ${imgAttributes} /></figure>`;

  /*
<figure class="cover-image">
      <img src="/im-wasserland/images/Im_Wasserland_1-320.jpeg" width="300" height="300" alt="Im Wasserland"
      srcset="/im-wasserland/images/Im_Wasserland_1-320.webp 320w, /im-wasserland/images/Im_Wasserland_1-587.webp 587w" im-wasserland="" images="" im_wasserland_1-320.jpeg="" 320w,="" im_wasserland_1-587.jpeg="" 587w"=""
      im_wasserland_1-320.png="" im_wasserland_1-587.png="" 587w""="" sizes="(max-width: 320px) 100vw, 320px" loading="lazy" decoding="async">
    </figure>
  */
};

const Image = require('@11ty/eleventy-img');

module.exports = async (src, url,
  alt,
  widths = [300],
  formats = ['webp', 'jpeg'],
  sizes = '30vw') => {

  const imageSrc = './src/posts' + url + '/images/' +src;

  const metadata = await Image(imageSrc, {
    crops: ['300x300'],
    widths: [...widths, null],
    formats: [...formats, null],
    urlPath: '/images/',
    outputDir: './build/images/'/*,
    sharpResizeOptions: {
      fit: sharp.fit.cover,
      position: sharp.strategy.attention
    }*/
  });

  const attributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt='' works okay)
  return Image.generateHTML(metadata, attributes);
}

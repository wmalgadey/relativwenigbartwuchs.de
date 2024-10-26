// 11ty configuration
const
  dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = eleventyConfig => {

  //#region PLUGINS

  // navigation
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));

  // needed for absoluteUrl feature
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));

  // syntax highlight
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));

  // favicons
  eleventyConfig.addPlugin(require('eleventy-plugin-gen-favicons'), {});

  //#endregion


  //#region TRANSFORMS

  // minify HTML
  if (!dev) {
    eleventyConfig.addTransform('htmlminify', require('./lib/transforms/htmlminify'));
  }

  // CSS processing
  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', require('./lib/extensions/scss'));
  eleventyConfig.addTransform('postcss', require('./lib/transforms/postcss'));

  //#endregion


  //#region FILTERS

  // open debugger
  eleventyConfig.addFilter('debugger', function (...args) {
    console.log(...args)
    debugger;
  });

  // format dates
  const dateformat = require('./lib/filters/dateformat');
  eleventyConfig.addFilter('datefriendly', dateformat.friendly);
  eleventyConfig.addFilter('dateymd', dateformat.ymd);

  // format word count and reading time
  eleventyConfig.addFilter('readtime', require('./lib/filters/readtime'));

  eleventyConfig.addFilter('splitlines', require('./lib/filters/split-lines'));

  //#endregion


  //#region SHORTCODES

  // extract first paragraph from post
  eleventyConfig.addShortcode('excerpt', require('./lib/shortcodes/excerpt.js'));

  // create preview images
  eleventyConfig.addAsyncShortcode('preview', require('./lib/shortcodes/preview-image'));

  //#endregion


  //#region CUSTOM COLLECTIONS

  // post collection (in blog/posts)
  eleventyConfig.addCollection('post', collection =>
    collection
      .getFilteredByGlob('./blog/posts/**/*.md')
      .filter(p => dev || (!p.data.draft && p.date <= now))
  );

  eleventyConfig.addCollection('schlagworte', require('./lib/collections/schlagworte'));
  eleventyConfig.addCollection('kategorien', require('./lib/collections/kategorien'));

  //#endregion


  //#region LIBRARIES

  eleventyConfig.setLibrary('md', require('./lib/markdown-it'));

  //#endregion


  //#region WATCH FOLDERS

  eleventyConfig.addWatchTarget('./rwb-vault/assets/css/');
  eleventyConfig.addWatchTarget('./rwb-vault/assets/js/');

  //#endregion


  // Copy any .jpg file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  // eleventyConfig.addPassthroughCopy("**/*.jpeg");
  // eleventyConfig.addPassthroughCopy("**/*.jpg");
  // eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy(".rwb-vault/assets/fonts/**/*");

  eleventyConfig.on('eleventy.after', require('./lib/preview-image-hook'));

  //#region 11ty defaults

  return {

    dir: {
      input: 'blog/',
      output: '_site'
    },

    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',

  };

  //#endregion
};

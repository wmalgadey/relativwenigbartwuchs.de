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

  // favicons
  eleventyConfig.addPlugin(require('eleventy-plugin-gen-favicons'), {});

  //#endregion


  //#region TRANSFORMS

  // inline assets
  eleventyConfig.addTransform('inline', require('./lib/transforms/inline'));

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

  // format dates
  const dateformat = require('./lib/filters/dateformat');
  eleventyConfig.addFilter('datefriendly', dateformat.friendly);
  eleventyConfig.addFilter('dateymd', dateformat.ymd);

  // format word count and reading time
  eleventyConfig.addFilter('readtime', require('./lib/filters/readtime'));

  //#endregion


  //#region SHORTCODES

  // page navigation
  eleventyConfig.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
  eleventyConfig.addShortcode('excerpt', require('./lib/shortcodes/excerpt.js'));
  eleventyConfig.addAsyncShortcode('coverimage', require('./lib/shortcodes/cover-image.js'));
  eleventyConfig.addAsyncShortcode('googleFonts', require('./lib/shortcodes/google-fonts'));

  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  });

  //#endregion


  //#region CUSTOM COLLECTIONS

  // post collection (in src/posts)
  eleventyConfig.addCollection('post', collection =>

    collection
      .getFilteredByGlob('./src/posts/**/*.md')
      .filter(p => dev || (!p.data.draft && p.date <= now))

  );

  eleventyConfig.addCollection('schlagworte', require('./lib/collections/schlagworte'));
  eleventyConfig.addCollection('kategorien', require('./lib/collections/kategorien'));

  //#endregion


  //#region LIBRARIES

  eleventyConfig.setLibrary('md', require('./lib/markdown-it'));

  //#endregion


  //#region WATCH FOLDERS

  eleventyConfig.addWatchTarget('./src/assets/css/');
  eleventyConfig.addWatchTarget('./src/assets/js/');

  //#endregion


  // Copy any .jpg file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("**/*.jpeg");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");

  //#region 11ty defaults

  return {

    dir: {
      input: 'src',
      output: '_site'
    },

    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',

  };

  //#endregion
};

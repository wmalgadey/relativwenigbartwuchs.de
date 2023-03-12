// 11ty configuration
const
  dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = config => {

  //#region PLUGINS

  // navigation
  config.addPlugin(require('@11ty/eleventy-navigation'));

  // needed for absoluteUrl feature
  config.addPlugin(require('@11ty/eleventy-plugin-rss'));

  //#endregion


  //#region TRANSFORMS

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'));

  // minify HTML
  if (!dev) {
    config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));
  }

  // CSS processing
  config.addTemplateFormats('scss');
  config.addExtension('scss', require('./lib/extensions/scss'));
  config.addTransform('postcss', require('./lib/transforms/postcss'));

  //#endregion


  //#region FILTERS

  // format dates
  const dateformat = require('./lib/filters/dateformat');
  config.addFilter('datefriendly', dateformat.friendly);
  config.addFilter('dateymd', dateformat.ymd);

  // format word count and reading time
  config.addFilter('readtime', require('./lib/filters/readtime'));

  //#endregion


  //#region SHORTCODES

  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));
  config.addShortcode('excerpt', require('./lib/shortcodes/excerpt.js'));
  config.addAsyncShortcode('coverImageUri', require('./lib/shortcodes/coverImage.js'));

  //#endregion


  //#region CUSTOM COLLECTIONS

  // post collection (in src/posts)
  config.addCollection('post', collection =>

    collection
      .getFilteredByGlob('./src/posts/**/*.md')
      .filter(p => dev || (!p.data.draft && p.date <= now))

  );

  // Tags
  config.addCollection('schlagworte', require('./lib/collections/schlagworte'));

  // Categories
  config.addCollection('kategorien', require('./lib/collections/kategorien'));

  //#endregion


  //#region LIBRARIES

  config.setLibrary('md', require('./lib/markdown-it'));

  //#endregion


  //#region WATCH FOLDERS

  config.addWatchTarget('./src/css/');
  config.addWatchTarget('./src/js/');

  //#endregion


  //#region 11ty defaults

  return {

    dir: {
      input: 'src',
      output: 'build'
    },

    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',

  };

  //#endregion
};

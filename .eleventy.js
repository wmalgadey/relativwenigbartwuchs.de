// 11ty configuration
import navigation from '@11ty/eleventy-navigation';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import genFavicons from 'eleventy-plugin-gen-favicons';
import htmlminify from './lib/transforms/htmlminify.js';
import scssExtension from './lib/extensions/scss.js';
import postcss from './lib/transforms/postcss.js';
import { friendly as datefriendly, ymd as dateymd } from './lib/filters/dateformat.js';
import readtime from './lib/filters/readtime.js';
import splitlines from './lib/filters/split-lines.js';
import excerpt from './lib/shortcodes/excerpt.js';
import preview from './lib/shortcodes/preview-image/index.js';
import post from './lib/collections/post.js';
import schlagworte from './lib/collections/schlagworte.js';
import kategorien from './lib/collections/kategorien.js';
import markdownIt from './lib/markdown-it.js';
import previewImageHook from './lib/preview-image-hook.js';

const dev = globalThis.dev = (process.env.ELEVENTY_ENV === 'development');
const now = new Date();

export default async eleventyConfig => {

  //#region PLUGINS

  // navigation
  eleventyConfig.addPlugin(navigation);

  // needed for absoluteUrl feature
  const { default: rssPlugin } = await import('@11ty/eleventy-plugin-rss');
  eleventyConfig.addPlugin(rssPlugin);

  // syntax highlight
  eleventyConfig.addPlugin(syntaxHighlight);

  // favicons
  eleventyConfig.addPlugin(genFavicons, {});

  //#endregion


  //#region TRANSFORMS

  // minify HTML
  if (!dev) {
    eleventyConfig.addTransform('htmlminify', htmlminify);
  }

  // CSS processing
  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', scssExtension);
  eleventyConfig.addTransform('postcss', postcss);

  //#endregion


  //#region FILTERS

  // open debugger
  eleventyConfig.addFilter('debugger', function (...args) {
    console.log(...args)
    debugger;
  });

  // format dates
  eleventyConfig.addFilter('datefriendly', datefriendly);
  eleventyConfig.addFilter('dateymd', dateymd);

  // format word count and reading time
  eleventyConfig.addFilter('readtime', readtime);

  eleventyConfig.addFilter('splitlines', splitlines);

  //#endregion


  //#region SHORTCODES

  // extract first paragraph from post
  eleventyConfig.addShortcode('excerpt', excerpt);

  // create preview images
  eleventyConfig.addAsyncShortcode('preview', preview);

  //#endregion


  //#region CUSTOM COLLECTIONS

  // post collection (in blog/posts)
  eleventyConfig.addCollection('post', collection => post(collection, { dev, now }));

  eleventyConfig.addCollection('schlagworte', schlagworte);
  eleventyConfig.addCollection('kategorien', kategorien);

  //#endregion


  //#region LIBRARIES

  eleventyConfig.setLibrary('md', markdownIt);

  //#endregion


  //#region WATCH FOLDERS

  eleventyConfig.addWatchTarget('./blog/assets/css/');
  eleventyConfig.addWatchTarget('./blog/assets/js/');

  //#endregion


  // Copy any .jpg file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  // eleventyConfig.addPassthroughCopy("**/*.jpeg");
  // eleventyConfig.addPassthroughCopy("**/*.jpg");
  // eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("blog/assets/fonts/**/*");

  eleventyConfig.on('eleventy.after', previewImageHook);

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

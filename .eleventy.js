// 11ty configuration
import navigation from '@11ty/eleventy-navigation';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import genFavicons from 'eleventy-plugin-gen-favicons';
import footnote_plugin from 'markdown-it-footnote';
import commentsByPost from './lib/collections/commentsByPost.js';
import kategorien from './lib/collections/kategorien.js';
import post from './lib/collections/post.js';
import schlagworte from './lib/collections/schlagworte.js';
import scssExtension from './lib/extensions/scss.js';
import { friendly as datefriendly, ymd as dateymd } from './lib/filters/dateformat.js';
import firstMarkdownImage from './lib/filters/firstmarkdownimage.js';
import readtime from './lib/filters/readtime.js';
import splitlines from './lib/filters/split-lines.js';
import markdownIt from './lib/markdown-it.js';
import previewImageHook from './lib/preview-image-hook.js';
import excerpt from './lib/shortcodes/excerpt.js';
import preview from './lib/shortcodes/preview-image/index.js';
import htmlminify from './lib/transforms/htmlminify.js';
import postcss from './lib/transforms/postcss.js';

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
  eleventyConfig.addFilter('md', (str) => markdownIt.renderInline(str ?? ''));
  eleventyConfig.addFilter('firstMarkdownImage', firstMarkdownImage);

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

  // comments grouped by post URL
  eleventyConfig.addCollection('commentsByPost', commentsByPost);

  //#endregion


  //#region GLOBAL DATA

  const COMMENTS_GLOBALLY_ENABLED = process.env.COMMENTS_ENABLED !== 'false';
  eleventyConfig.addGlobalData('commentsGloballyEnabled', COMMENTS_GLOBALLY_ENABLED);

  //#endregion


  //#region LIBRARIES

  eleventyConfig.setLibrary('md', markdownIt.use(footnote_plugin));

  //#endregion


  //#region WATCH FOLDERS

  eleventyConfig.addWatchTarget('./blog/assets/css/');
  eleventyConfig.addWatchTarget('./blog/assets/js/');

  //#endregion


  // Prevent comment markdown files from being rendered as individual pages
  eleventyConfig.ignores.add('blog/posts/*/comments/**');


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

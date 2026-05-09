// 11ty configuration
import navigation from '@11ty/eleventy-navigation';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

import genFavicons from 'eleventy-plugin-gen-favicons';
import footnote_plugin from 'markdown-it-footnote';

import categories from './lib/collections/categories.js';
import commentsByPost from './lib/collections/comments-by-post.js';
import post from './lib/collections/post.js';
import tags from './lib/collections/tags.js';
import scssExtension from './lib/extensions/scss.js';
import { friendly as datefriendly, ymd as dateymd } from './lib/filters/date-format.js';
import firstMarkdownImage from './lib/filters/first-markdown-image.js';
import readtime from './lib/filters/read-time.js';
import splitlines from './lib/filters/split-lines.js';
import markdownIt from './lib/markdown-it.js';
import excerpt from './lib/shortcodes/excerpt.js';
import previewImage from './lib/shortcodes/preview-image.js';
import socialImage from './lib/social-image.js';
import htmlminify from './lib/transforms/htmlminify.js';
import postcss from './lib/transforms/postcss.js';
import ConsoleLogger from './lib/utils/logger.js';

const log = new ConsoleLogger('eleventy');
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
    log.debug(...args);
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

  // Returns all posts belonging to the same serie/* category as the given categories array
  eleventyConfig.addFilter('seriesPosts', (categories, allPosts) => {
    const seriesCategory = (categories || []).find(cat => cat.startsWith('serie/'));
    if (!seriesCategory) return [];
    return (allPosts || [])
      .filter(post => (post.data.categories || []).includes(seriesCategory) && (dev || !post.data.draft) )
      .sort((a, b) => new Date(a.data['date created']) - new Date(b.data['date created']));
  });

  // Display label for a hierarchical category slug, e.g. "formate/artikel" → "Artikel"
  eleventyConfig.addFilter('categorylabel', (category) => {
    const segment = String(category).split('/').pop();
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  });

  //#endregion


  //#region SHORTCODES

  // extract first paragraph from post
  eleventyConfig.addShortcode('excerpt', excerpt);

  // create preview images
  eleventyConfig.addAsyncShortcode('preview', previewImage);

  //#endregion


  //#region CUSTOM COLLECTIONS

  // post collection (in blog/posts)
  eleventyConfig.addCollection('post', collection => post(collection, { dev, now }));

  eleventyConfig.addCollection('tags', tags);
  eleventyConfig.addCollection('categories', categories);

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

  eleventyConfig.on('eleventy.after', socialImage);

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

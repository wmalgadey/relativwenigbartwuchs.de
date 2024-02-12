// minify HTML
const htmlmin = require('html-minifier');

module.exports = (content, outputPath = '.html') => {

  if (!String(outputPath).endsWith('.html')) return content;

  console.log(`[htmlminify] html has been minified`);

  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true
  });

};

// PostCSS CSS processing

/* global dev */

const
  postcss = require('postcss'),
  postcssPlugins = [
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('cssnano')
  ],
  postcssOptions = {
    from: undefined,
    map: dev ? { inline: true } : false,
  };

module.exports = async (content, outputPath) => {

  if (!String(outputPath).endsWith('.css')) return content;

  console.log(`[postcss] ${outputPath} has been processed`);

  return (
    await postcss(postcssPlugins).process(content, postcssOptions)
  ).css;

};

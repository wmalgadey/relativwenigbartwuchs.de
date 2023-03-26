// inline data
const { inlineSource } = require('inline-source');

module.exports = async (content, outputPath) => {

  if (!String(outputPath).endsWith('.html')) return content;

  console.log(`[inline] ${outputPath} assets have been inlined`);

  return await inlineSource(content, {
    compress: true,
    rootpath: './build/'
  });

};

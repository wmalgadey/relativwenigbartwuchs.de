// PostCSS CSS processing

import path from 'node:path';
import postcss from 'postcss';
import postcssAdvancedVariables from 'postcss-advanced-variables';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

const postcssPlugins = [
  postcssAdvancedVariables,
  postcssNested,
  cssnano
];

export default async (content, outputPath) => {

  if (!String(outputPath).endsWith('.css')) return content;

  const postcssOptions = {
    from: undefined,
    map: globalThis.dev ? { inline: true } : false,
  };

  console.log(`[css] ${path.basename(outputPath)}`);

  return (
    await postcss(postcssPlugins).process(content, postcssOptions)
  ).css;

};

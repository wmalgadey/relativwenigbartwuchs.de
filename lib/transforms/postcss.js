// PostCSS CSS processing

import path from 'node:path';
import postcss from 'postcss';
import postcssAdvancedVariables from 'postcss-advanced-variables';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';
import ConsoleLogger from '../utils/logger.js';

const log = new ConsoleLogger('css');

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

  log.info(`Writing ${outputPath}`);

  return (
    await postcss(postcssPlugins).process(content, postcssOptions)
  ).css;

};


const path = require('node:path');
const glob = require('glob');
const { resize } = require('./shortcodes/preview-image/resize');

module.exports = async ({ dir, results, runMode, outputMode }) => {
  const globPattern = `${dir.output}/**/preview.svg`;

  console.log(`[preview-image] Reading ${globPattern}`);

  const files = await glob.glob(globPattern);

  console.log(`[preview-image] Converting ${files.length} files`);

  for (const file of files) {
    try {
      imageSrc = path.basename(file);
      outputPath = inputPath = path.dirname(file);

      await resize(imageSrc, inputPath, outputPath, '');
    } catch (err) {
      console.error(err, file);
    }
  };
};

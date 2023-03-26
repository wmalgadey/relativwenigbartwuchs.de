
const glob = require('glob');
const { resize } = require('./shortcodes/cover-image/resize');

module.exports = async ({ dir, results, runMode, outputMode }) => {
  const globPattern = `${dir.output}/**/preview.svg`;

  console.log(`[preview-image-hook] Reading ${globPattern}`);

  const files = await glob.glob(globPattern);

  console.log(`[preview-image-hook] Converting ${files.length} files`);

  for (const file of files) {
    try {
      await resize(file);

      console.log(`[preview-image-hook] Converting ${file}`);
    } catch (err) {
      console.error(err, file);
    }
  };
};

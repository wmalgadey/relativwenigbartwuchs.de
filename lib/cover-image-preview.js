
const glob = require('glob');
const { resize } = require('./shortcodes/cover-image/resize');

module.exports = async () => {


  var files = await glob.glob('./_site/**/preview.svg');

  for (var file of files) {
    await resize(file);
  };
};

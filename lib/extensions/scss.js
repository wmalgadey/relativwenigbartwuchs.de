const sass = require('sass');
const path = require('node:path');

module.exports = {
  outputFileExtension: 'css', // optional, default: 'html'

  // `compile` is called once per .scss file in the input directory
  compile: async function (inputContent, inputPath) {
    let parsed = path.parse(inputPath);

    console.log("[scss]", inputPath, this.config.dir.includes);

    let result = sass.compileString(inputContent, {
      sourceMap: dev,
      style: 'expanded',
      loadPaths: [
        parsed.dir || '.',
        `./rwb-vault/blog/${this.config.dir.includes}`,
        './node_modules'
      ]
    });

    console.log(`[scss] compiled ${inputPath}`);

    // This is the render function, `data` is the full data cascade
    return async (data) => {
      return result.css;
    };
  }
};

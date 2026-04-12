import * as sass from 'sass';
import path from 'node:path';

export default {
  outputFileExtension: 'css',

  compile: async function (inputContent, inputPath) {
    let parsed = path.parse(inputPath);

    let result = sass.compileString(inputContent, {
      sourceMap: globalThis.dev,
      style: 'expanded',
      quietDeps: true,
      loadPaths: [
        parsed.dir || '.',
        `./blog/${this.config.dir.includes}`,
        './node_modules'
      ]
    });

    console.log(`[scss] ${path.basename(inputPath)}`);

    return async (data) => {
      return result.css;
    };
  }
};

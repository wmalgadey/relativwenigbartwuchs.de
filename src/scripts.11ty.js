const esbuild = require('esbuild')

module.exports = class {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true,
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: ['./src/assets/js/main.js'],
      bundle: true,
      minify: !dev,
      outdir: './build/assets/js',
      sourcemap: dev,
      target: dev ? 'esnext' : 'es6',
    })
  }
};

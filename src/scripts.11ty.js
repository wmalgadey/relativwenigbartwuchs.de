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
      entryPoints: ['./src/js/main.js'],
      bundle: true,
      minify: !dev,
      outdir: './build/js',
      sourcemap: dev,
      target: dev ? 'esnext' : 'es6',
    })
  }
};

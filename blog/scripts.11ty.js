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
      entryPoints: ['./rwb-vault/blog/assets/js/main.js'],
      bundle: true,
      minify: !dev,
      outdir: './_site/assets/js',
      sourcemap: dev,
      target: dev ? 'esnext' : 'es6',
    })
  }
};

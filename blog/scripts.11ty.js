import esbuild from 'esbuild';

export default class {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true,
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: ['./blog/assets/js/main.js'],
      bundle: true,
      minify: !globalThis.dev,
      outdir: './_site/assets/js',
      sourcemap: globalThis.dev,
      target: globalThis.dev ? 'esnext' : 'es6',
    })
  }
}

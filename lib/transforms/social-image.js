// .eleventy.js
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const createSocialImageForArticle = (input, output) =>
  new Promise((resolve, reject) => {
    // read data from input file
    const data = fs.readFileSync(input, {
      encoding: 'utf-8',
    });

    // get title from file data
    const [, title] = data.match(/title:(.*)/);

    // draw cover image
    const canvas = createCanvas(1024, 512);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '64px sans-serif';
    ctx.fillText(title, 0, 64);

    // test if the output directory already exists, if not, create
    const outputDir = path.dirname(output);
    if (!fs.existsSync(outputDir))
      fs.mkdirSync(outputDir, { recursive: true });

    // write the output image
    const stream = fs.createWriteStream(output);
    stream.on('finish', resolve);
    stream.on('error', reject);
    canvas
      .createJPEGStream({
        quailty: 0.8,
      })
      .pipe(stream);
  });

module.exports = async function (content) {
  // only handle blog posts
  if (!this.inputPath.endsWith('.md')) return content;

  try {
    await createSocialImageForArticle(
      // our input article
      this.inputPath,

      // the output image name
      this.outputPath.replace('.html', '.jpeg')
    );
  } catch (err) {
    console.error(err);
  }

  // return normal content
  return content;
};

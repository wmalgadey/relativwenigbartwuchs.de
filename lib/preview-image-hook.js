import path from 'node:path';
import { glob } from 'glob';
import { resize } from './shortcodes/preview-image/resize.js';

export default async ({ dir, results, runMode, outputMode }) => {
  const globPattern = `${dir.output}/**/preview.svg`;

  const files = await glob(globPattern);

  if (files.length === 0) return;

  console.log(`[preview] SVG → JPEG+WebP: ${files.length} files`);

  for (const file of files) {
    try {
      const imageSrc = path.basename(file);
      const outputPath = path.dirname(file);
      await resize(imageSrc, outputPath, outputPath, '');
    } catch (err) {
      console.error(`[preview] error: ${file}`, err.message);
    }
  }
};

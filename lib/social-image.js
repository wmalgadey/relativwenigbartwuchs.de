import path from 'node:path';
import { glob } from 'glob';
import { resize } from './utils/resize-image.js';
import ConsoleLogger from './utils/logger.js';
import chalk from 'kleur';
import { Logger } from 'sass';

const log = new ConsoleLogger('social-image');

export default async ({ dir, results, runMode, outputMode }) => {
  const globPattern = `${dir.output}/**/preview.svg`;

  const files = await glob(globPattern);

  if (files.length === 0) return;

  log.info(`SVG → JPEG+WebP: ${files.length} files`);

  for (const file of files) {
    try {
      const imageSrc = path.basename(file);
      const outputPath = path.dirname(file);

      await resize(imageSrc, outputPath, outputPath, '', {}, log);
    } catch (err) {
      log.error(`Error processing file: ${file}`, err.message);
    }
  }
};

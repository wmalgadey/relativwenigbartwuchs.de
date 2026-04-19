import { readFileSync } from 'node:fs';

const MARKDOWN_IMAGE_RE = /!\[.*?\]\(([^\s)]+)/;

export default function firstMarkdownImage(inputPath) {
  try {
    const content = readFileSync(inputPath, 'utf-8');
    const match = content.match(MARKDOWN_IMAGE_RE);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

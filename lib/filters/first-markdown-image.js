import { readFileSync } from 'node:fs';
import path from 'node:path';

// Matches standard markdown images: ![alt](path) or ![alt](path "title")
// Handles paths with spaces (e.g. "./Im Wasserland/images/file.png")
const MARKDOWN_IMAGE_RE = /!\[.*?\]\(([^)]+?)(?:\s+["'][^"']*["'])?\s*\)/;

export default function firstMarkdownImage(inputPath) {
  try {
    const content = readFileSync(inputPath, 'utf-8');
    const match = content.match(MARKDOWN_IMAGE_RE);
    if (!match) return null;

    let imagePath = match[1].trim();

    // Strip leading ./ prefix
    if (imagePath.startsWith('./')) {
      imagePath = imagePath.slice(2);
    }

    // Strip leading sibling-folder prefix (same name as the file without extension)
    // e.g. "Im Wasserland/images/file.png" → "images/file.png" for "Im Wasserland.md"
    const stem = path.basename(inputPath, path.extname(inputPath));
    if (imagePath.startsWith(stem + '/')) {
      imagePath = imagePath.slice(stem.length + 1);
    }

    return imagePath;
  } catch {
    return null;
  }
}

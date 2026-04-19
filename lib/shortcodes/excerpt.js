import { readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { extractExcerpt } from '../collections/utils.js';

export default (post) => {
  if (post.data.excerpt) {
    return post.data.excerpt;
  }

  if (!post.inputPath) return '';

  try {
    const raw = readFileSync(post.inputPath, 'utf-8');
    const { content } = matter(raw);
    return extractExcerpt(content);
  } catch {
    return '';
  }
};

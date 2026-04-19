import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';
import { extractExcerpt } from './utils.js';

export default (collection, { dev, now }) => {
  const postFiles = globSync(['./blog/posts/*.md', './blog/posts/*/index.md']);
  const posts = [];

  postFiles.forEach(filePath => {
    const raw = readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    if (!dev && (data.draft || new Date(data['date created']) > now)) return;

    const title = data.title || '';
    const slug = slugify(title);
    const url = `/${slug}/`;

    // Try to get the real Eleventy item (may be unavailable if called before
    // posts are indexed — same dependency-ordering issue as kategorien).
    const eleventyItem = collection.getAll().find(
      item => item.inputPath === filePath || item.inputPath === `./${filePath}`
    );

    const excerpt = data.excerpt || extractExcerpt(content);

    const proxy = eleventyItem ?? {
      url,
      inputPath: filePath,
      outputPath: `./_site/${slug}/index.html`,
      date: new Date(data['date created']),
      data: {
        ...data,
        dateCreated: data['date created'],
        dateModified: data['date modified'],
        excerpt,
      },
    };

    if (!proxy.data.excerpt) proxy.data.excerpt = excerpt;

    posts.push(proxy);
  });

  posts.sort((a, b) =>
    new Date(a.data['date created']) - new Date(b.data['date created'])
  );

  console.log(`[post] created collection with ${posts.length} posts`);

  return posts;
};

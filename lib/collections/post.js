import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

function extractExcerpt(markdownContent) {
  const paragraphs = markdownContent.trim().split(/\n\n+/);
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('```') || trimmed.startsWith('!') || trimmed.startsWith('\\_')) continue;
    return trimmed
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      .replace(/(\*\*|__)([^*_]+)\1/g, '$2')
      .replace(/(\*|_)([^*_]+)\1/g, '$2')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/~~([^~]+)~~/g, '$1')
      .replace(/\\([_*[\](){}#+\-.!])/g, '$1')
      .replace(/\n/g, ' ')
      .trim();
  }
  return '';
}

export default (collection, { dev, now }) => {
  const postFiles = globSync('./blog/posts/**/*.md');
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

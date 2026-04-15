import path from 'node:path';
import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';

const extractExcerpt = (raw) => {
  const { content } = matter(raw);
  const para = content.split(/\n\n+/).find(p => p.trim() && !p.trimStart().startsWith('#'));
  return para ? para.trim() : '';
};

export default collection => {
  const tags = { all: [] };

  // collection.getAll() may only have non-post pages at this point because
  // Eleventy v3 builds custom collections in dependency order. Read post files
  // directly to be order-independent (same approach as kategorien.js).
  const postFiles = globSync('./blog/posts/**/*.md');

  postFiles.forEach(filePath => {
    const raw = readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    if (!data.tags) return;

    // Try to get the real Eleventy item for full template context.
    const eleventyItem = collection.getAll().find(
      item => item.inputPath === filePath || item.inputPath === `./${filePath}`
    );

    const slug = path.basename(path.dirname(filePath));
    const url = `/${slug}/`;
    const item = eleventyItem ?? {
      url,
      inputPath: filePath,
      outputPath: `./_site/${slug}/index.html`,
      data: {
        ...data,
        dateCreated: data['date created'],
        excerpt: data.excerpt ?? extractExcerpt(raw),
      },
    };

    data.tags.filter(
      tag => !['posts', 'all'].includes(tag)
        && !tag.startsWith('type/')
        && !tag.startsWith('journal/')
    ).forEach(tag => {
      if (!tags[tag]) {
        tags.all.push({ title: tag, path: '/schlagwort/' });
        tags[tag] = [];
      }
      tags[tag].push(item);
    });
  });

  let max = 0;
  let min = 999999;

  for (const tag in tags) {
    const all = tags.all.find(c => c.title === tag);

    if (all) {
      all.used = tags[tag].length;

      max = Math.max(max, all.used);
      min = Math.min(min, all.used);
    }
  }

  var weightMin = 1;
  var weightMax = 9;

  for (var tag of tags.all) {
    tag.weight = tag.used === min
      ? weightMin
      : (tag.used / max) * (weightMax - weightMin) + weightMin;
  }

  for (const tag in tags) {
    if (tag !== 'all' && Array.isArray(tags[tag])) {
      tags[tag].sort((a, b) =>
        new Date(b.data['date created']) - new Date(a.data['date created'])
      );
    }
  }

  tags.all.sort((a, b) => {
    const nameA = a.title.toUpperCase();
    const nameB = b.title.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  console.log(`[schlagworte] created collection with ${tags.all.length} tags`);

  return tags;
};

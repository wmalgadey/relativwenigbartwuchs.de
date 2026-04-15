import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const extractExcerpt = (raw) => {
  const { content } = matter(raw);
  const para = content.split(/\n\n+/).find(p => p.trim() && !p.trimStart().startsWith('#'));
  return para ? para.trim() : '';
};

export default collection => {
  let categories = { all: [] };

  // collection.getAll() may only have non-post pages at this point because
  // Eleventy v3 builds custom collections in dependency order and 'kategorien'
  // (k) is required by header.njk on every page, so it runs before post
  // templates are indexed. Read post files directly to be order-independent.
  const postFiles = globSync('./blog/posts/**/*.md');

  postFiles.forEach(filePath => {
    const raw = readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    if (!data.categories) return;

    const title = data.title || '';
    const slug = slugify(title);
    const url = `/${slug}/`;

    // Try to get the real Eleventy item for full template context (may be
    // unavailable if called before posts are indexed).
    const eleventyItem = collection.getAll().find(
      item => item.inputPath === filePath
    );

    const proxy = eleventyItem ?? {
      url,
      inputPath: filePath,
      outputPath: `./_site/${slug}/index.html`,
      data: {
        ...data,
        dateCreated: data['date created'],
        excerpt: data.excerpt ?? extractExcerpt(raw),
      },
    };

    data.categories.filter(
      cat => !['posts', 'all'].includes(cat)
    ).forEach(cat => {
      if (!categories[cat]) {
        categories.all.push({ title: cat, path: '/kategorie/' });
        categories[cat] = [];
      }
      categories[cat].push(proxy);
    });
  });

  for (const category in categories) {
    const all = categories.all.find(c => c.title === category);
    if (all) {
      all.used = categories[category].length;
    }
  }

  for (const cat in categories) {
    if (cat !== 'all' && Array.isArray(categories[cat])) {
      categories[cat].sort((a, b) =>
        new Date(b.data['date created']) - new Date(a.data['date created'])
      );
    }
  }

  categories.all.sort((a, b) => {
    const nameA = a.title ? a.title.toUpperCase() : '';
    const nameB = b.title ? b.title.toUpperCase() : '';
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  console.log(`[kategorien] created collection with ${categories.all.length} kategorien`);

  return categories;
};

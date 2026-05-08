import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';
import { extractExcerpt } from '../utils/extract-excerpt.js';
import ConsoleLogger from '../utils/logger.js';

const log = new ConsoleLogger('collections');

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export default collection => {
  let categories = { all: [] };

  // collection.getAll() may only have non-post pages at this point because
  // Eleventy v3 builds custom collections in dependency order and 'kategorien'
  // (k) is required by header.njk on every page, so it runs before post
  // templates are indexed. Read post files directly to be order-independent.
  const postFiles = globSync(['./blog/posts/*.md', './blog/posts/*/*.md']);

  postFiles.forEach(filePath => {
    const raw = readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

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
        dateModified: data['date modified'],
        excerpt: data.excerpt ?? extractExcerpt(content),
      },
    };

    data.categories.filter(
      cat => !['posts', 'all'].includes(cat)
    ).forEach(cat => {
      if (!categories[cat]) {
        const segments = cat.split('/');
        const parent = segments[0];
        const child = segments.slice(1).join('/');
        const label = capitalize(segments[segments.length - 1]);
        categories.all.push({
          title: cat,
          slug: cat,
          label,
          parent,
          child,
          url: `/kategorie/${cat}/`,
          path: '/kategorie/',
          used: 0,
        });
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

  // Build hierarchical parent → children structure
  const parentMap = {};
  categories.all.forEach(entry => {
    if (!entry.parent) return;
    if (!parentMap[entry.parent]) {
      parentMap[entry.parent] = {
        slug: entry.parent,
        label: capitalize(entry.parent),
        url: `/kategorie/${entry.parent}/`,
        children: [],
      };
    }
    parentMap[entry.parent].children.push(entry);
  });
  categories.parents = Object.values(parentMap).sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  const skipKeys = new Set(['all', 'parents']);
  for (const cat in categories) {
    if (!skipKeys.has(cat) && Array.isArray(categories[cat]) && categories[cat][0]?.data) {
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

  log.info(`Created ${categories.all.length} categories`, 'collection');

  return categories;
};

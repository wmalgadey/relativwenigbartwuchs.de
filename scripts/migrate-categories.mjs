#!/usr/bin/env node
/**
 * Migrate flat categories to hierarchical parent/child format.
 *
 * Taxonomy mapping:
 *   Artikel          → formate/artikel
 *   Bericht          → formate/bericht
 *   Kommentar        → formate/kommentar
 *   Zitat            → formate/zitat
 *   Lesezeichen      → formate/lesezeichen
 *   Neuigkeit        → formate/neuigkeit
 *   Porträt          → formate/portrait
 *   Kritik + Film    → rezensionen/film
 *   Serie (subfolder)→ serie/<folder-slug> + rezensionen/bücher (child posts)
 *   Serie (index)    → serie/<title-slug>  + formate/artikel
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, basename, relative } from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const POSTS_DIR = 'blog/posts';

const SIMPLE_MAP = {
  Artikel: 'formate/artikel',
  Bericht: 'formate/bericht',
  Kommentar: 'formate/kommentar',
  Zitat: 'formate/zitat',
  Lesezeichen: 'formate/lesezeichen',
  Neuigkeit: 'formate/neuigkeit',
  'Porträt': 'formate/portrait',
};

const postFiles = globSync([`${POSTS_DIR}/*.md`, `${POSTS_DIR}/*/*.md`]);
let changed = 0;

for (const filePath of postFiles) {
  const raw = readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const { data } = parsed;

  if (!data.categories || !Array.isArray(data.categories)) continue;

  const oldCats = data.categories;
  const catSet = new Set(oldCats);
  const newCats = [];

  // Special case: Film + Kritik → rezensionen/film
  if (catSet.has('Film') && catSet.has('Kritik')) {
    newCats.push('rezensionen/film');
    catSet.delete('Film');
    catSet.delete('Kritik');
  }

  // Special case: Serie
  if (catSet.has('Serie')) {
    catSet.delete('Serie');
    const relDir = relative(POSTS_DIR, dirname(filePath));
    const isChildPost = relDir !== '' && relDir !== '.';

    if (isChildPost) {
      // File is inside a subfolder → it's a child post of the series
      const seriesSlug = slugify(basename(dirname(filePath)));
      newCats.push(`serie/${seriesSlug}`);
      // Child posts in Bücherstapel are book reviews
      newCats.push('rezensionen/bücher');
      catSet.delete('Artikel'); // don't also emit formate/artikel for these
    } else {
      // File is directly in blog/posts/ → it's the series index article
      const seriesSlug = slugify(data.title || basename(filePath, '.md'));
      newCats.push(`serie/${seriesSlug}`);
      // Keep the remaining Artikel category (will be mapped below)
    }
  }

  // Map remaining simple categories
  for (const cat of catSet) {
    if (SIMPLE_MAP[cat]) {
      newCats.push(SIMPLE_MAP[cat]);
    } else {
      // Unknown → keep as-is and warn
      console.warn(`  UNKNOWN category "${cat}" in ${filePath}`);
      newCats.push(cat);
    }
  }

  if (JSON.stringify(oldCats) === JSON.stringify(newCats)) continue;

  data.categories = newCats;

  // Stringify preserving original formatting as much as possible
  // gray-matter stringify re-serialises the frontmatter
  const newContent = matter.stringify(parsed.content, data, { lineWidth: -1 });
  writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ ${filePath}`);
  console.log(`  ${oldCats.join(', ')} → ${newCats.join(', ')}`);
  changed++;
}

console.log(`\nDone. ${changed} file(s) updated.`);

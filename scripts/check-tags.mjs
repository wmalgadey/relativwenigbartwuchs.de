#!/usr/bin/env node
// Prüft, ob verschiedene Schlagworte auf dieselbe URL /schlagwort/<slug>/ fallen
// (z. B. "künstliche intelligenz" und "künstliche-intelligenz"). Eleventy bricht
// sonst mit "Output conflict ... DuplicatePermalinkOutputError" ab.
//
// Nutzt dieselben Globs, Filter und denselben slugify wie lib/collections/tags.js
// bzw. blog/schlagwort/all.md. Entwürfe werden bewusst mitgeprüft, damit der
// Konflikt nicht erst beim Veröffentlichen auffällt.

import { globSync } from 'glob';
import { readFileSync } from 'node:fs';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const postFiles = globSync(['./blog/posts/*.md', './blog/posts/*/*.md']).sort();

// slug -> Map(tag -> [Dateien])
const bySlug = new Map();

for (const file of postFiles) {
  const { data } = matter(readFileSync(file, 'utf8'));
  const tags = [].concat(data.tags ?? []).map(String);

  for (const tag of tags) {
    if (['posts', 'all'].includes(tag) || tag.startsWith('type/') || tag.startsWith('journal/')) continue;

    const slug = slugify(tag);
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    const variants = bySlug.get(slug);
    if (!variants.has(tag)) variants.set(tag, []);
    variants.get(tag).push(file);
  }
}

const conflicts = [...bySlug].filter(([, variants]) => variants.size > 1);

if (conflicts.length === 0) {
  console.log(`✔ ${bySlug.size} Schlagworte geprüft, keine Kollisionen.`);
  process.exit(0);
}

console.error(`✘ ${conflicts.length} Schlagwort-Kollision(en) gefunden:\n`);
for (const [slug, variants] of conflicts) {
  console.error(`  /schlagwort/${slug}/`);
  for (const [tag, files] of variants) {
    console.error(`    "${tag}"`);
    for (const f of files) console.error(`        ${f}`);
  }
  console.error('');
}
console.error('Bitte die Schreibweisen vereinheitlichen.');
process.exit(1);

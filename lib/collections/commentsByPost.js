import { globSync } from 'glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import markdownIt from '../markdown-it.js';

export default (_collection) => {
  const commentFiles = globSync('./blog/posts/*/comments/*.md');
  const byPost = {};

  for (const filePath of commentFiles) {
    const raw = readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const postUrl = data.post;
    if (!postUrl) continue;

    const comment = {
      inputPath: filePath,
      data,
      templateContent: markdownIt.render(content),
      children: [],
    };

    (byPost[postUrl] ||= []).push(comment);
  }

  for (const postUrl in byPost) {
    const all = byPost[postUrl];
    const byId = Object.fromEntries(all.map(c => [c.data.id, c]));

    for (const c of all.filter(c => c.data.parent)) {
      const parent = byId[c.data.parent];
      if (parent) (parent.children ||= []).push(c);
    }

    byPost[postUrl] = all
      .filter(c => !c.data.parent)
      .sort((a, b) => {
        const aDate = a.data.created ? new Date(a.data.created).getTime() : 0;
        const bDate = b.data.created ? new Date(b.data.created).getTime() : 0;
        return aDate - bDate;
      });
  }

  return byPost;
};

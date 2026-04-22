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
    };

    (byPost[postUrl] ||= []).push(comment);
  }

  for (const postUrl in byPost) {
    byPost[postUrl].sort((a, b) => {
      const aDate = a.data.created ? new Date(a.data.created).getTime() : 0;
      const bDate = b.data.created ? new Date(b.data.created).getTime() : 0;
      return aDate - bDate;
    });
  }

  return byPost;
};

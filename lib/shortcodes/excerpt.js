import { parseHTML } from 'linkedom';

export default (post) => {
  if (post.data.excerpt) {
    return post.data.excerpt;
  }

  if (!post.templateContent) return '';

  const { document } = parseHTML(post.templateContent);

  const paragraphs = [...document.querySelectorAll('p')];

  if (paragraphs.length === 0) {
    return post.templateContent;
  }

  return paragraphs[0].outerHTML;
};

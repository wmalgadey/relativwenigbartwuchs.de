const { parseHTML } = require('../linkedom-0.14.24/cjs/index');

module.exports = (post) => {
  if (!post.templateContent) return '';

  if (post.data.excerpt) {
    return post.data.excerpt;
  }

  const { document } = parseHTML(post.templateContent);

  const paragraphs = [...document.querySelectorAll('p')];

  if (paragraphs.length === 0) {
    return post.templateContent;
  }

  return paragraphs[0].outerHTML;
};

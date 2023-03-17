const { parseHTML } = require('../linkedom-0.14.24/cjs/index');

module.exports = (post) => {
  if (!post.templateContent) return '';

  const { document } = parseHTML(post.templateContent);

  const paragraphs = [...document.querySelectorAll('p')];

  if (paragraphs.length === 0) {
    return post.templateContent;
  }

  return paragraphs[0].outerHTML;

  if (post.templateContent.indexOf('</p>') > 0) {
    let end = post.templateContent.indexOf('</p>');
    return post.templateContent.substr(0, end + 4);
  }
  return post.templateContent;
};

module.exports = (post) => {
  if (!post.templateContent) return '';
  if (post.templateContent.indexOf('</p>') > 0) {
    let end = post.templateContent.indexOf('</p>');
    return post.templateContent.substr(0, end + 4);
  }
  return post.templateContent;
};

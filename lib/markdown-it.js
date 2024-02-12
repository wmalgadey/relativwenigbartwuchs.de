const markdown = require('markdown-it');
const markdownOptions = {
  html: true,
  breaks: false,
  linkify: true
};

module.exports = markdown(markdownOptions)
  .use(require('markdown-it-attrs'))
  .use(require('./markdown/obsidian'))
  .use(require('./markdown/figure'));

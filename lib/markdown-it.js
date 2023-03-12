const markdown = require('markdown-it');
const markdownOptions = {
  html: true,
  breaks: false,
  linkify: true
};
const markdownAttrs = require('markdown-it-attrs');

module.exports = markdown(markdownOptions).use(markdownAttrs);

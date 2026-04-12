import markdown from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import obsidian from './markdown/obsidian.js';
import figure from './markdown/figure.js';

const markdownOptions = {
  html: true,
  breaks: false,
  linkify: true
};

export default markdown(markdownOptions)
  .use(markdownItAttrs)
  .use(obsidian)
  .use(figure);

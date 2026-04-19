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
  .use(figure)
  .use((md) => {
    md.core.ruler.push('external_links', (state) => {
      for (const token of state.tokens) {
        if (token.type !== 'inline') continue;
        for (const child of token.children) {
          if (child.type === 'link_open' && child.attrGet('href')?.startsWith('http')) {
            child.attrSet('target', '_blank');
            child.attrSet('rel', 'noopener noreferrer');
          }
        }
      }
    });
  });

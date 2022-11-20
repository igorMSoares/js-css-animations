import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import anchor from 'markdown-it-anchor';

const md = new MarkdownIt();

export default {
  title: 'Js-Css Animations',
  description: 'Animate your web apps or site using Javascript',
  markdown: {
    anchor: {
      getTokensText: tokens => {
        return tokens
          .filter(t => t.type === 'text' && t.info !== 'entity' && t.content)
          .map(t => t.content)
          .join('')
          .replace(/\s.*$/, '');
      },
      permalink: anchor.permalink.ariaHidden({
        symbol: '§',
      }),
    },
    // anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '🔗' },
  },
};

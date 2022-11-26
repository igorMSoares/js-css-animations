import anchor from 'markdown-it-anchor';

export default {
  title: 'Js-Css Animations',
  description: 'Animate your web apps or site using Javascript',
  appearance: 'dark',
  markdown: {
    anchor: {
      getTokensText: tokens => {
        const tokensText = tokens
          .filter(t => t.type === 'text' && t.info !== 'entity' && t.content)
          .map(t => t.content)
          .join('')
          .replace(/(?!\s.+\))\s.*$/, '')
          .replace('(', '-');
        return tokensText;
      },
      permalink: anchor.permalink.ariaHidden({
        symbol: '§',
      }),
    },
  },
  themeConfig: {
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Slide', link: '/examples/#slide-animations' },
          { text: 'Fade', link: '/examples/#fade-in-out' },
          { text: 'Collapse', link: '/examples/#collapse-expand' },
        ],
      },
      {
        text: 'Documentation',
        items: [
          { text: 'js-css-animations.js', link: '/js-css-animations' },
          { text: 'animate.js', link: '/animate' },
          { text: 'resize-parent.js', link: '/resize-parent' },
          { text: 'measurements.js', link: '/measurements' },
          { text: 'transitions.js', link: '/transitions' },
          { text: 'globals.js', link: '/globals' },
        ],
      },
    ],
  },
};

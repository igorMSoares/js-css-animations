<script setup>
  import { getHighlighter } from 'shiki';
  import { onMounted } from 'vue';

  const props = defineProps({
    code: String,
    lang: String,
    langs: Array,
    snippetId: String,
    highlight: Array,
  });

  const {
    code = '',
    lang = 'js',
    langs = ['javascript'],
    snippetId = '',
    highlight = [],
  } = props;

  onMounted(async () => {
    // @ts-ignore
    const highlighter = await getHighlighter({ theme: 'material-theme-palenight', langs: langs });

    await highlighter.loadTheme('material-theme-palenight')
    await highlighter.loadLanguage('javascript')

    let lineOptions = [];
    highlight.forEach(lineNumber => {
      if (typeof lineNumber === 'string') {
        const range = lineNumber.match(/\d+/g);
        if (range) {
          for (let i = +range[0]; i <= +range[1]; i++) {
            lineOptions.push({
              line: i,
              classes: ['highlighted'],
            });
          }
        }
      } else if (typeof lineNumber === 'number') {
        lineOptions.push({
          line: lineNumber,
          classes: ['highlighted'],
        });
      }
    });

    const snippet = highlighter.codeToHtml(code, {
      theme: 'material-theme-palenight',
      lang: lang,
      lineOptions: lineOptions,
    });

    // @ts-ignore
    document.querySelector(`#${snippetId} .shiki-code`).innerHTML = snippet;
    document.querySelector(`#${snippetId} pre`)?.removeAttribute('style');
  });
</script>

<template>
  <div :id="snippetId" class="code-snippet" :class="`language-${lang}`">
    <button title="Copy Code" class="copy"></button>
    <span class="lang">{{ lang }}</span>
    <div class="shiki-code"></div>
  </div>
</template>

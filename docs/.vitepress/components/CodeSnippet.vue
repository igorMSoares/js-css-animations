<script setup>
  import { getHighlighter, setCDN } from 'shiki';
  import { onMounted } from 'vue';

  const props = defineProps({
    code: String,
    lang: String,
    langs: Array,
  });

  const code = props.code ?? '';
  const { lang = 'js', langs = ['javascript'] } = props;

  onMounted(() => {
    setCDN('https://unpkg.com/shiki/');
    // @ts-ignore
    getHighlighter({ theme: 'material-palenight', langs: langs }).then(
      highlighter => {
        const snippet = highlighter.codeToHtml(code, { lang: lang });
        // @ts-ignore
        document.querySelector('.shiki-code').innerHTML = snippet;
        document.querySelector('.code-snippet pre')?.removeAttribute('style');
      }
    );
  });
</script>

<template>
  <div class="code-snippet language-js">
    <button title="Copy Code" class="copy"></button>
    <span class="lang">{{ lang }}</span>
    <div class="shiki-code"></div>
  </div>
</template>

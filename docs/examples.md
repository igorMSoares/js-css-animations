---
aside: false
---

<script setup>
  import Example from './.vitepress/components/Example.vue'
  import examples from './examples.json'

  import jsCssAnimations from '../js-css-animations/js-css-animations.js';
  import '../js-css-animations/js-animations.css';

  function slideAnimations() {
    jsCssAnimations.init.slideUp({
      trigger: `.${ examples.slide.btnList[0].class }`,
    });
    jsCssAnimations.init.slideDown({
      trigger: `.${ examples.slide.btnList[1].class }`,
    });
    jsCssAnimations.init.slideLeft({
      trigger: `.${ examples.slide.btnList[2].class }`,
    });
    jsCssAnimations.init.slideRight({
      trigger: `.${ examples.slide.btnList[3].class }`,
    });
  }

  function fadeAnimation() {
    jsCssAnimations.init.fade({
      trigger: `.${examples.fade.btnList[0].class}`,
      keepSpace: true,
    })
  }

  function collapseAnimation() {
    jsCssAnimations.init.collapse({
      trigger: `.${examples.collapse.btnList[0].class}`,
      staggerDelay: 500,
    })
  }
</script>

<Example
  :animation-fn="slideAnimations"
  :btn-list="examples.slide.btnList"
  :content-list="examples.slide.contentList"
/>

<Example
  :animation-fn="fadeAnimation"
  :btn-list="examples.fade.btnList"
  :content-list="examples.fade.contentList"
/>

<Example
  :animation-fn="collapseAnimation"
  :btn-list="examples.collapse.btnList"
  :content-list="examples.collapse.contentList"
/>

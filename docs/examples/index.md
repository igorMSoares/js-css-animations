---
title: Examples
aside: false
---

<script setup>
  import Example from '../.vitepress/components/Example.vue'
  import examples from './examples.json'

  import jsCssAnimations from '../../js-css-animations/js-css-animations.js';
  import '../../js-css-animations/js-animations.css';

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
      keepSpace: true,
    })
  }

  function collapseAnimation() {
    jsCssAnimations.init.collapse({
      trigger: `.${examples.collapse.btnList[0].class}`,
      staggerDelay: 600,
    })
  }
</script>

<script>
export default {
}

</script>

# Examples

<Example
  :animation-fn="slideAnimations"
  :title="'Slide Animations'"
  :btn-list="examples.slide.btnList"
  :content-list="examples.slide.contentList">

```js{4}
jsCssAnimations.init.slideUp({
  trigger: '.slide-up--btn',
  targetSelector: '.example__slide',
  on: 'click', // This is the default value, so it can be ommited
});
jsCssAnimations.init.slideDown({
  trigger: '.slide-down--btn',
  targetSelector: '.example__slide',
});
jsCssAnimations.init.slideLeft({
  trigger: '.slide-left--btn',
  targetSelector: '.example__slide',
});
jsCssAnimations.init.slideRight({
  trigger: '.slide-right--btn',
  targetSelector: '.example__slide',
});
```

</Example>

<Example
  :animation-fn="fadeAnimation"
  :title="'Fade In / Out'"
  :btn-list="examples.fade.btnList"
  :content-list="examples.fade.contentList">

```html{1}
<button class="js-anim--trigger" target-selector=".fade__example">
  Fade In/Out
</button>
<div class="fade__example"><p>...</p></div>
```

```js{4}
// When 'trigger' option is omitted, .init will look for
// any element(s) that have the 'js-anim--trigger' class
jsCssAnimations.init.fade({
  maintainSpace: true,
});
```

</Example>

<Example
  :animation-fn="collapseAnimation"
  :title="'Collapse/Expand'"
  :btn-list="examples.collapse.btnList"
  :content-list="examples.collapse.contentList">

```js{4}
jsCssAnimations.init.collapse({
  trigger: '.collapse--btn',
  targetSelector: '.example__collapse',
  staggerDelay: 500, // '0.5s' or '500ms' would also work
});
```

</Example>

<style>
</style>

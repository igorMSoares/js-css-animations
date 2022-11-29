---
title: Examples
aside: false
---

<script setup>
  import { onMounted } from 'vue';
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

  function toggleBtnTitle(btnList, idx) {
    const btnSelector = btnList[idx].class;
    const btn = document.querySelector(`.${btnSelector}`)
    const btnText = btnList[idx].text;

    btn.innerText = btn.innerText === btnText[0] ? btnText[1] : btnText[0];

  }

  const fadeOpts = {
      keepSpace: true,
      complete: () => {
        toggleBtnTitle(examples.fade.btnList, 0);
      }
    }
  function fadeAnimation() {
    jsCssAnimations.init.fade(fadeOpts)
  }

  const collapseOpts = {
      trigger: `.${examples.collapse.btnList[0].class}`,
      staggerDelay: '600ms',
      complete: () => {
        toggleBtnTitle(examples.collapse.btnList, 0);
      }
  }
  function collapseAnimation() {
    jsCssAnimations.init.collapse(collapseOpts)
  }

  function resetAnimation(animName, opts) {
      const btnList = examples[animName].btnList;
      btnList.forEach(btn => {
        const triggerSelector = `.${btn.class}`;
        jsCssAnimations.end(triggerSelector);

        const default_value = {
          duration: '800ms',
          delay: '0ms',
          staggerDelay: '0ms',
          timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        }

        const easingRegEx = /^(ease(-in|-out|-in-out)?|linear|cubic-bezier\((0|1|0.\d+), -?[\d\.]+, (0|1|0.\d+), -?[\d\.]+\)|step\((100|[0-9][0-9]|[0-9]),\s?(jump-start|jump-end|jump-none|jump-both|start|end)\)|step\(step-(start|end)\))$/;

        if (opts.maintainSpace) opts.dimensionsTransition = false;
        if (!opts.easing || !opts.easing.match(easingRegEx))
          opts.easing = default_value.timingFunction;
        ['duration', 'delay', 'staggerDelay'].forEach(prop => {
          if (opts[prop].match(/^\d+$/)) opts[prop] = `${opts[prop]}ms`;
          else if (!opts[prop].match(/^(\d+ms|\d+s)$/)) {
            opts[prop] = default_value[prop];
          }
        });

        const animation = animName === 'slide' ? 
        (triggerSelector.replace('--btn','').replace(/-(\w)/,(l) => l.toUpperCase()).replaceAll(/[-\.]/g,'')) : animName;
        jsCssAnimations.init[animation]({
          trigger: triggerSelector,
          ...opts,
          timingFunction: opts.easing,
          keepSpace: opts.maintainSpace
        });
        document.querySelector(triggerSelector).click();
      })

  }

</script>

# Examples

<Example
:animation-fn="slideAnimations"
:title="'Slide Animations'"
:btn-list="examples.slide.btnList"
:content-list="examples.slide.contentList"
:anim-opts="{}"
@reset-animation="(opts) => {resetAnimation('slide', opts);}"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'dimensionsTransition']">

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
:content-list="examples.fade.contentList"
:anim-opts="fadeOpts"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'dimensionsTransition']"
@reset-animation="(opts) => {resetAnimation('fade', opts);}">

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
:content-list="examples.collapse.contentList"
:anim-opts="collapseOpts"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'dimensionsTransition', 'transfOrigin']"
@reset-animation="(opts) => {resetAnimation('collapse', opts);}">

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

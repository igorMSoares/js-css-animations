---
title: Examples
aside: false
---

<script setup>
  import { onMounted } from 'vue';
  import Example from '../.vitepress/components/Example.vue'
  import CodeSnippet from '../.vitepress/components/CodeSnippet.vue'
  import examples from './examples.json'

  import jsCssAnimations from '../../js-css-animations/js-css-animations.js';
  import '../../js-css-animations/js-animations.css';

  function toggleBtnTitle(btnList, idx) {
    const btnSelector = btnList[idx].class;
    const btn = document.querySelector(`.${btnSelector}`)
    const btnText = btnList[idx].text;

    btn.innerText = btn.innerText === btnText[0] ? btnText[1] : btnText[0];
  }

  function slideAnimations() {
    const toggleSlideBtns = () => {
        toggleBtnTitle(examples.slide.btnList, 0);
        toggleBtnTitle(examples.slide.btnList, 1);
        toggleBtnTitle(examples.slide.btnList, 2);
        toggleBtnTitle(examples.slide.btnList, 3);
    }
    jsCssAnimations.init.slideUp({
      trigger: `.${ examples.slide.btnList[0].class }`,
      complete: () => {
        toggleSlideBtns();
      },
    });
    jsCssAnimations.init.slideDown({
      trigger: `.${ examples.slide.btnList[1].class }`,
      complete: () => {
        toggleSlideBtns();
      },
    });
    jsCssAnimations.init.slideLeft({
      trigger: `.${ examples.slide.btnList[2].class }`,
      complete: () => {
        toggleSlideBtns();
      },
    });
    jsCssAnimations.init.slideRight({
      trigger: `.${ examples.slide.btnList[3].class }`,
      complete: () => {
        toggleSlideBtns();
      },
    });
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
      staggerDelay: '500ms',
      complete: () => {
        toggleBtnTitle(examples.collapse.btnList, 0);
      }
  }
  function collapseAnimation() {
    jsCssAnimations.init.collapse(collapseOpts)
  }

  function resetAnimation(animName, {opts}) {
      const btnList = examples[animName].btnList;
      btnList.forEach(btn => {
        const triggerSelector = `.${btn.class}`;
        jsCssAnimations.end(triggerSelector);

        const defaultValue = {
          duration: '800ms',
          delay: '0ms',
          staggerDelay: '0ms',
          timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
          blur: '0.5px'
        }

        const easingRegEx = /^(ease(-in|-out|-in-out)?|linear|cubic-bezier\((0|1|0.\d+), -?[\d\.]+, (0|1|0.\d+), -?[\d\.]+\)|step\((100|[0-9][0-9]|[0-9]),\s?(jump-start|jump-end|jump-none|jump-both|start|end)\)|step\(step-(start|end)\))$/;

        if (opts.maintainSpace) opts.dimensionsTransition = false;
        if (!opts.blur.match(/^(\d+|\d+\.\d+)(px|rem|em)$/)) opts.blur = defaultValue.blur;
        if (!opts.easing || !opts.easing.match(easingRegEx))
          opts.easing = defaultValue.timingFunction;
        ['duration', 'delay', 'staggerDelay'].forEach(prop => {
          if (opts[prop].match(/^\d+$/)) opts[prop] = `${opts[prop]}ms`;
          else if (!opts[prop].match(/^(\d+|\d+\.\d+)(ms|s)$/)) {
            opts[prop] = defaultValue[prop];
          }
        });

        const animation = animName === 'slide'
          ? (triggerSelector.replace('--btn','')
            .replace(/-(\w)/,(l) => l.toUpperCase()).replaceAll(/[-\.]/g,''))
          : animName;
        jsCssAnimations.init[animation]({
          trigger: triggerSelector,
          ...opts,
          timingFunction: opts.easing,
          keepSpace: opts.maintainSpace
        });
        document.querySelector(triggerSelector).click();
      })
  }

  function animationApi() {
    return jsCssAnimations;
  }
</script>

# Examples

<Example
:animation-api="animationApi"
:animation-fn="slideAnimations"
:animation-name="'slide'"
:title="'Slide Animations'"
:btn-list="examples.slide.btnList"
:content-list="examples.slide.contentList"
:anim-opts="{}"
@reset-animation="(opts) => {resetAnimation('slide', opts);}"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'dimensionsTransition', 'overflowHidden']"
:code-snippet="[{
code: `jsCssAnimations.init.slideUp({
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
});`,
highlight: [4]
}]"
/>

<Example
:animation-api="animationApi"
:animation-fn="fadeAnimation"
:animation-name="'fade'"
:title="'Fade In / Out'"
:btn-list="examples.fade.btnList"
:content-list="examples.fade.contentList"
:anim-opts="fadeOpts"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'blur', 'dimensionsTransition', 'iteration', 'direction']"
@reset-animation="(opts) => {resetAnimation('fade', opts);}"
:code-snippet="[{
code: `// When 'trigger' option is omitted, .init will look for
// any element(s) that have the 'js-anim--trigger' class
jsCssAnimations.init.fade({
  maintainSpace: true,
});`,
highlight: [4],
}]">

```html{1}
<button class="js-anim--trigger" target-selector=".fade__example">
  Fade Out
</button>
<div class="fade__example"><p>...</p></div>
```

</Example>

<Example
:animation-api="animationApi"
:animation-fn="collapseAnimation"
:animation-name="'collapse'"
:title="'Collapse/Expand'"
:btn-list="examples.collapse.btnList"
:content-list="examples.collapse.contentList"
:anim-opts="collapseOpts"
:fields-list="['duration', 'delay', 'staggerDelay', 'maintainSpace', 'easing', 'dimensionsTransition', 'transfOrigin']"
@reset-animation="(opts) => {resetAnimation('collapse', opts);}"
:code-snippet="[{
code: `jsCssAnimations.init.collapse({
  trigger: '.collapse--btn',
  targetSelector: '.example__collapse',
  staggerDelay: 500, // '0.5s' or '500ms' would also work
});
`,
highlight: [4]
}]"/>

<style>
</style>

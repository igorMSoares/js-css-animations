---
title: Examples
aside: false
---

<script setup>
  import { onMounted, ref } from 'vue';
  import Example from '../.vitepress/components/Example.vue'
  import CodeSnippet from '../.vitepress/components/CodeSnippet.vue'
  import examples from './examples.json'

  import jsCssAnimations from '../../js-css-animations/js-css-animations.js';
  import '../../js-css-animations/js-animations.css';

  function toggleBtnTitle(btnList, idx) {
    const btnSelector = btnList[idx].class;
    const btn = document.querySelector(`.${btnSelector}`)
    const btnText = btnList[idx].text;

    btn.innerText = btn.innerText === btnText[0] ? btnText[1] ?? btnText[0] : btnText[0];
  }

  function toggleBtnHandler(animationName) {
    const btnList = examples[animationName].btnList;
    const btnCount = btnList.length;
    for (let i = 0; i < btnCount; i++) {
      toggleBtnTitle(btnList, i);
    }
  }

  function slideAnimations() {
    const complete = () => {
        toggleBtnHandler('slide');
      };

    jsCssAnimations.init.slideUp({
      trigger: `.${ examples.slide.btnList[0].class }`,
      complete,
    });

    jsCssAnimations.init.slideDown({
      trigger: `.${ examples.slide.btnList[1].class }`,
      complete,
    });

    jsCssAnimations.init.slideLeft({
      trigger: `.${ examples.slide.btnList[2].class }`,
      complete,
    });

    jsCssAnimations.init.slideRight({
      trigger: `.${ examples.slide.btnList[3].class }`,
      complete,
    });
  }

  const fadeOpts = {
      maintainSpace: true,
    }
  function fadeAnimation() {
    jsCssAnimations.init.fade({
      ...fadeOpts,
      complete: () => {
        toggleBtnHandler('fade');
      }
    })
  }

  const collapseOpts = {
      staggerDelay: '500ms',
  }
  function collapseAnimation() {
    jsCssAnimations.init.collapse({
      ...collapseOpts,
      trigger: `.${examples.collapse.btnList[0].class}`,
      complete: () => {
        toggleBtnHandler('collapse');
      }
    })
  }

  function rotationAnimations() {
    ['rotateRightCCW', 'rotateLeftCCW', 'rotateDown', 'rotateLeft', 'rotateRight'].forEach((animation, i) => {
      jsCssAnimations.init[animation]({
        trigger: `.${ examples.rotations.btnList[i].class }`,
        targetSelector: `.example__rotate`,
        complete: () => {
          toggleBtnHandler('rotations')
        }
      });
    })
  }

  const angleRef = ref(0);
  const customRotateOpts = {
    angle: 155
  }
  function customRotationAnimation(angle) {
    jsCssAnimations.init.rotate({
      trigger: '.rotate--btn',
      targetSelector: '.example__custom-rotate',
      ...customRotateOpts,
      complete: () => {
        toggleBtnHandler('rotate')
      }
    })
  }

  const validateAnimationFormField = {
    timePropertyValidation: val => val.match(/^(\d+|\d+\.\d+)(ms|s)?$/),
    blur: val => val.match(/^(\d+|\d+\.\d+)(px|rem|em)$/),
    easing: val => {
      const easingRegEx = /^(ease(-in|-out|-in-out)?|linear|cubic-bezier\((0|1|0.\d+), -?[\d\.]+, (0|1|0.\d+), -?[\d\.]+\)|step\((100|[0-9][0-9]|[0-9]),\s?(jump-start|jump-end|jump-none|jump-both|start|end)\)|step\(step-(start|end)\))$/;
      return val && val.match(easingRegEx)
    },
    duration: val => validateAnimationFormField.timePropertyValidation(val),
    delay: val => validateAnimationFormField.timePropertyValidation(val),
    staggerDelay: val => validateAnimationFormField.timePropertyValidation(val),
    angle: val => val.match(/^\-?(\d+|\d+\.\d+)(deg)?$/),
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
          easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
          blur: '0.5px',
          angle: '0deg'
        }

        const numberRegEx = opts.angle ? /^\-?(\d+|\d+\.\d+)$/ : /^(\d+|\d+\.\d+)$/;
        if (opts.maintainSpace) opts.dimensionsTransition = false;
        if (!validateAnimationFormField.blur(opts.blur)) opts.blur = defaultValue.blur;
        if (!validateAnimationFormField.easing(opts.easing))
          opts.easing = defaultValue.easing;
        ['duration', 'delay', 'staggerDelay'].forEach(prop => {
          if (opts[prop].match(numberRegEx)) opts[prop] = `${opts[prop]}ms`;
          else if (!validateAnimationFormField[prop](opts[prop])) {
            opts[prop] = defaultValue[prop];
          }
        });
        if (opts.angle) {
          if (!validateAnimationFormField.angle(opts.angle)) opts.angle = defaultValue.angle
          else if (opts.angle.match(numberRegEx)) opts.angle = Number(opts.angle); 
        }

        const animation = [ 'slide', 'rotations'].includes(animName)
          ? (triggerSelector.replace('--btn','')
            .replace(/-(\w)/,(l) => l.toUpperCase()).replace(/[-\.]/g,''))
          : animName;
        jsCssAnimations.init[animation]({
          trigger: triggerSelector,
          ...opts,
          complete: () => toggleBtnHandler(animName)
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
:animation-form-validation="validateAnimationFormField"
:code-snippet="{
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
}"
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
:animation-form-validation="validateAnimationFormField"
:code-snippet="{
code: `// When 'trigger' option is omitted, .init will look for
// any element(s) that have the 'js-anim--trigger' class
jsCssAnimations.init.fade({
  maintainSpace: true,
});`,
highlight: [4],
}">

<div class="align-center">

::: tip
Setting '_maintainSpace: **true**_' will automatically set '_dimensionsTransition_' to **false**.

It's important to note that, when '_dimensionsTransition_' is set to **true**, it can have an impact on the performance of the page, as it will trigger browser's **Paint** and **Layout** steps which can be costly.
:::

</div>

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
:animation-form-validation="validateAnimationFormField"
:code-snippet="{
code: `jsCssAnimations.init.collapse({
  trigger: '.collapse--btn',
  targetSelector: '.example__collapse',
  staggerDelay: 500, // '0.5s' or '500ms' would also work
});
`,
highlight: [4]
}"/>

<Example
:animation-api="animationApi"
:animation-fn="rotationAnimations"
:animation-name="'rotations'"
:title="'Rotate'"
:btn-list="examples.rotations.btnList"
:content-list="examples.rotations.contentList"
:anim-opts="{}"
:fields-list="['duration', 'delay', 'easing', 'transfOrigin']"
@reset-animation="(opts) => {resetAnimation('rotations', opts)}"
:animation-form-validation="validateAnimationFormField"
:code-snippet="{
code: `jsCssAnimations.init.rotateRightCCW({
  trigger: '.rotateRightCCW--btn',
  targetSelector: '.example__rotate',
});
jsCssAnimations.init.rotateLeftCCW({
  trigger: '.rotateLeftCCW--btn',
  targetSelector: '.example__rotate',
});
jsCssAnimations.init.rotateDown({
  trigger: '.rotateDown--btn',
  targetSelector: '.example__rotate',
});
jsCssAnimations.init.rotateLeft({
  trigger: '.rotateLeft--btn',
  targetSelector: '.example__rotate',
});
jsCssAnimations.init.rotateRight({
  trigger: '.rotateRight--btn',
  targetSelector: '.example__rotate',
});
`}">

<div class="rotation-example--wrapper">

<div class="example__rotate rotation-area">
  <p class="rotation-area--text">↑</p>
</div>

### Predefined Rotations

A set of predefined rotation animations is available to choose from:

- **rotateUp**: will always bring the element to its original position by setting rotation angle to _0 degrees_.
- **rotateDown**: rotation angle will be set to _180 degrees_.
- **rotateLeft**: _270 degrees_.
- **rotateRight**: _90 degrees_.

### Counter Clockwise

There's also a set of predefined counter clockwise rotations:

- **rotateDownCCW**: rotation angle will be set to _-180 degrees_.
- **rotateLeftCCW**: _-90 degrees_.
- **rotateRightCCW**: _-180 degrees_.

::: tip
_Notice that when toggling back up from any rotation, the element will rotate in the opposite direction of the initial rotation. For example: when using **rotateLeftCCW** to rotate an element by clicking a button, the first time the button is clicked the element will rotate **-90 degrees** (counter clockwise), then, in the next button click, the element will toggle back up by rotating clockwise back to zero degrees._
:::

</div>
</Example>

<Example
:animation-api="animationApi"
:animation-fn="customRotationAnimation"
:animation-name="'rotate'"
:title="'Custom Rotation'"
:btn-list="examples.rotate.btnList"
:content-list="examples.rotate.contentList"
:anim-opts="customRotateOpts"
:fields-list="['duration', 'delay', 'angle', 'easing', 'transfOrigin']"
@reset-animation="(opts) => {resetAnimation('rotate', opts)}"
:animation-form-validation="validateAnimationFormField"
:code-snippet="{
code: `jsCssAnimations.init.rotate({
  trigger: '.rotate--btn',
  targetSelector: '.example__rotate',
  angle: 155,
});
`
}">

<div class="rotation-example--wrapper">
  <div class="example__custom-rotate rotation-area">
    <p class="rotation-area--text">↑</p>
  </div>

### Choose any angle of rotation

If you want to rotate by a specific angle, use the _rotate()_ method passing the '_angle_' option.

The angle can either be passed as a **number** representing the amount in degrees, or as a **string** in the format '\<angle\>deg'

</div>

</Example>

<style scoped>
.rotation-example--wrapper, .align-center {
  text-align: center;
}

.rotation-example--wrapper ul {
  text-align: left;
}

.rotation-area {
  width: 5rem;
  height: 5rem;
  background-color: darkolivegreen;
  margin: 1rem auto;
  padding-top: 0.25em;
  border-radius: 50%;
  position: relative;
  z-index: -1;
}

.rotation-area--text {
  margin: 0;
  font-size: 2rem;
  color: beige;
  text-align: center;
}

input {
  width: 3rem;
  appearance: listbox;
  -webkit-appearance: listbox;
  text-align: center;
  border: 1px solid var(--vp-c-gray-dark-1);
  border-radius: 4px;
  padding: 0.2em 0.6em;
  margin-top: 10px;
  background-color: var(--vp-c-bg);
  transition: background-color 0.5s;
  touch-action: manipulation;
}

input:focus,
input:hover {
  border: 1px solid var(--vp-c-green-lighter);
}
</style>

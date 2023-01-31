## Js-Css-Animations

<p align="center">
...Work in progress....
</p>

<p align="center">
<img alt="Cat typing furiously" src="https://i.giphy.com/media/uzglgIsyY1Cgg/giphy.webp" width="150" />
</p>

## Overview

I'm creating this library to practice plain javascript and also because I'm always using
CSS animations in my projects, so I thought: "why not make my own animation library?" 😁

It provides an API to easily set and customize CSS animations using only Javascript.

## Development Stage

Although the functionalities are all already working, I'm still making some changes, mainly to improve overall performance.

## How to use it

1. Copy the './_js-css-animations/_' directory to your project's folder

2. Link the **js-animations.css** in your HTML file:

```html
<link
  rel="stylesheet"
  href="<path-to-js-directory>/js-css-animations/js-animations.css"
/>
```

3. Import the **js-css-animations.js** in your javascript file

```js
import jsCssAnimations from './js-css-animations/js-css-animations.js';
```

4. All ready and set!

```js
// Example of usage
jsCssAnimations.init.slideUp({
  trigger: '.btn--slide-up',
  targetSelector: '.slide-this-content',
  staggerDelay: 500,
  duration: '1s',
  start: () => {
    jsCssAnimations.toggle('#anchor img', 'rotateDownCCW', 'rotateUp');
  },
});
```

## Documentation

I'm working hard to provide a complete documentation for the library, with examples to cover all the functionalities.

You can access the documentation and some usage examples [here](https://js-css-animations.vercel.app) .

The docs were generated with jsDoc and [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) and the documentation page is built with [vitepress](https://github.com/vuejs/vitepress).
Thanks to vitepress, the [Examples section](https://js-css-animations.vercel.app/examples/) is reactive by using Vue components inside the markdown files, so you can play around with the examples and test different values for the animations options. 😉

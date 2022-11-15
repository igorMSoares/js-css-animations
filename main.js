import jsCssAnimations from './js-css-animations/js-css-animations.js';

// jsCssAnimations.init.slideLeft({
//   toggleBtn: '.my-custom-btn',
//   toggleSelector: '.p1, .p2',
//   timingFunction: 'ease-in-out',
//   duration: '1.5s',
//   delay: 250,
//   staggerDelay: '0.75s',
//   start: () => {
//     const elem = document.querySelector('.my-custom-btn img');
//     if (jsCssAnimations.isRotated('img')) {
//       jsCssAnimations.rotateUp('img', {
//         duration: 500,
//         staggerDelay: 500,
//         resetAfter: false,
//       });
//     } else {
//       jsCssAnimations.rotate('img', {
//         rotationDeg: '-90deg',
//         duration: 500,
//         staggerDelay: 500,
//         resetAfter: false,
//       });
//     }
//   },
//   complete: () => {
//     const elem = document.querySelector('.p1');
//     console.log(jsCssAnimations.isHidden(elem));
//   },
// });

jsCssAnimations.init.slideUp({
  toggleBtn: '.btn--slide-up',
  // widthTransition: false,
  // heightTransition: false,
  // delay: '1.5s',
  staggerDelay: 500,
  duration: '1s',
  start: () => {
    if (jsCssAnimations.isRotated('#anchor img')) {
      jsCssAnimations.rotateUp('#anchor img');
    } else {
      jsCssAnimations.rotateDownCCW('#anchor img');
    }
  },
});

jsCssAnimations.init.slideRight({
  toggleBtn: '.btn--slide-right',
  start: () => {
    if (jsCssAnimations.isRotated('#anchor2 img')) {
      jsCssAnimations.rotateUp('#anchor2 img');
    } else {
      jsCssAnimations.rotateRight('#anchor2 img');
    }
  },
});

jsCssAnimations.init.slideDown({
  toggleBtn: '.btn--slide-down',
  delay: '1.5s',
  complete: () => {
    if (jsCssAnimations.isRotated('img')) {
      jsCssAnimations.rotateUp('img');
    } else {
      jsCssAnimations.rotateDownCCW('img');
    }
  },
});

jsCssAnimations.init.slideLeft({
  toggleBtn: '.btn--slide-left',
  staggerDelay: 500,
  start: () => {
    if (jsCssAnimations.isRotated('img')) {
      jsCssAnimations.rotateUp('img', {
        staggerDelay: 300,
      });
    } else {
      jsCssAnimations.rotateLeftCCW('img', { duration: '1.2s' });
    }
  },
});

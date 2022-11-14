import jsCssAnimations from './js-css-animations/js-css-animations.js';

// jsCssAnimations.init.collapse({
//   timingFunction: 'ease',
//   resetAfter: false,
//   start: () => {
//     const elem = document.querySelector('.my-custom-btn img');
//     // jsCssAnimations.rotateDownCCW(elem);
//   },
// });

jsCssAnimations.init.slideLeft({
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.p1, .p2',
  timingFunction: 'ease-in-out',
  duration: '1.5s',
  delay: 250,
  staggerDelay: '0.75s',
  start: () => {
    const elem = document.querySelector('.my-custom-btn img');
    if (jsCssAnimations.isRotated('img')) {
      jsCssAnimations.rotateUp('img', {
        duration: 500,
        staggerDelay: 500,
        resetAfter: false,
      });
      // jsCssAnimations.hide.slideLeft('.p2');
    } else {
      // jsCssAnimations.show.slideRight('.p2');
      jsCssAnimations.rotate('img', {
        rotationDeg: '-90deg',
        duration: 500,
        staggerDelay: 500,
        resetAfter: false,
      });
    }
  },
  complete: () => {
    const elem = document.querySelector('.p1');
    console.log(jsCssAnimations.isHidden(elem));
  },
  // complete: () => {
  //   const elem = document.querySelector('.content p:nth-child(1)');
  //   jsCssAnimations.rotateDown(elem, { delay: '500ms', resetAfter: false });
  // },
});

// jsCssAnimations.slideUp('.content p', {
//   resetAfter: false,
//   heightTransition: true,
//   widthTransition: true,
//   hide: false,
// });
// setTimeout(() => {
//   jsCssAnimations.slideDown(elem, { action: 'show' });
// }, 1000);

import jsCssAnimations from './js-css-animations/js-css-animations.js';

// jsCssAnimations.init.collapse({
//   timingFunction: 'ease',
//   resetAfter: false,
//   start: () => {
//     const elem = document.querySelector('.my-custom-btn img');
//     // jsCssAnimations.rotateDownCCW(elem);
//   },
// });

jsCssAnimations.init.slideUp({
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.p1',
  timingFunction: 'ease-in-out',
  start: () => {
    const elem = document.querySelector('.my-custom-btn img');
    if ([...elem.classList].find(c => c.match(/rotate-down/))) {
      jsCssAnimations.rotateUp('img', { duration: 3500 });
    } else {
      jsCssAnimations.rotateDownCCW('img');
    }
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

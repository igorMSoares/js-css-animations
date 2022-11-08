import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.init.collapse({
  timingFunction: 'ease',
  resetAfter: false,
  start: () => {
    const elem = document.querySelector('.my-custom-btn img');
    jsCssAnimations.rotateDownCCW(elem);
  },
});

jsCssAnimations.init.slideUp({
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.content p:nth-child(2)',
  timingFunction: 'ease-in-out',
  start: () => {
    const elem = document.querySelector('.my-custom-btn img');
    if ([...elem.classList].find(c => c.match(/rotate-down/))) {
      jsCssAnimations.rotateUp(elem, { duration: '1000ms' });
    } else {
      jsCssAnimations.rotateDownCCW(elem);
    }
  },
  // complete: () => {
  //   const elem = document.querySelector('.content p:nth-child(1)');
  //   jsCssAnimations.rotateDown(elem, { delay: '500ms', resetAfter: false });
  // },
});

import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.init.slideUp({
  trigger: '.btn--slide-up',
  staggerDelay: 500,
  duration: '1s',
  dimensionsTransition: false,
  start: () => {
    jsCssAnimations.toggle('#anchor img', 'rotateDownCCW', 'rotateUp');
  },
});

// jsCssAnimations.init.slideRight({
//   trigger: '.btn--slide-right',
//   start: () => {
//     jsCssAnimations.toggle('#anchor2 img', 'rotateRight', 'rotateUp');
//   },
// });

// jsCssAnimations.init.slideDown({
//   trigger: '.btn--slide-down',
//   delay: '1.5s',
//   start: () => {
//     jsCssAnimations.toggle('img', 'rotateDownCCW', 'rotateUp', {
//       delay: '1.5s',
//     });
//     // @ts-ignore
//     document.querySelector('.delay-counter').innerText = '1.5 seconds Delay';
//     jsCssAnimations.show.collapse('.delay-counter', {
//       keepSpace: true,
//     });
//   },
//   complete: () => {
//     jsCssAnimations.hide.fade('.delay-counter', {
//       keepSpace: true,
//       complete: () => {
//         // @ts-ignore
//         document.querySelector('.delay-counter').innerText = '';
//       },
//     });
//   },
// });

// jsCssAnimations.init.slideLeft({
//   trigger: '.btn--slide-left',
//   staggerDelay: 500,
//   start: () => {
//     jsCssAnimations.toggle('img', 'slideLeft', 'slideLeft', {
//       staggerDelay: 400,
//       overflowHidden: false,
//       keepSpace: true,
//     });
//   },
// });

// jsCssAnimations.init.collapse({
//   trigger: '.collapse-expand--btn',
//   targetSelector: '.collapse-expand--p',
// });

// jsCssAnimations.init.collapse({
//   trigger: '.collapse-expand--btn__mult',
//   targetSelector: '.collapse-expand--p__mult',
//   staggerDelay: 400,
//   keepSpace: true,
//   transfOrigin: 'center',
// });

// jsCssAnimations.init.fade({
//   trigger: '.fade--btn',
//   blur: 12,
//   keepSpace: true,
// });

// const validateInput = input => {
//   if (input.validity.patternMismatch) {
//     const msgArea = document.querySelector('.rotation--input-error');
//     // @ts-ignore
//     msgArea.innerText = 'Type in a number (e.g.: 270, -22.5)';
//     jsCssAnimations.show.fade(msgArea, {
//       complete: () => {
//         setTimeout(() => {
//           jsCssAnimations.hide.fade(msgArea, { delay: '2.5s' });
//         }, 0);
//       },
//     });
//     input.value = '';
//     return false;
//   } else {
//     return true;
//   }
// };

// jsCssAnimations.init.rotate({
//   trigger: '#rotation-angle',
//   targetSelector: '.rotation-area',
//   on: 'change',
//   // @ts-ignore
//   start: () => {
//     if (validateInput(document.querySelector('#rotation-angle'))) {
//       // @ts-ignore
//       const angle = Number(document.getElementById('rotation-angle')?.value);
//       jsCssAnimations.rotate('.rotation-area', {
//         angle: angle,
//       });
//     }
//   },
//   complete: () => {
//     jsCssAnimations.rotate('.rotation-area', {
//       angle: '0deg',
//       delay: '1s',
//     });
//   },
// });

// jsCssAnimations.pulsate('#anchor2 img', {
//   finalScale: 1.2,
// });

// jsCssAnimations.init.scale({
//   targetSelector: '.p2',
//   finalScale: 1.2,
//   duration: '1.5s',
// });

// document.querySelector('#anchor img')?.addEventListener('click', () => {
//   jsCssAnimations.end('.btn--slide-up');
// });

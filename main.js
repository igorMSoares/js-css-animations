import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.visibility.slideDown({
  duration: '5000ms',
  timingFunction: 'ease',
});

// jsCssAnimations.show.slideDown(
//   document.querySelector('.content p:nth-child(1)'),
//   {
//     delay: '400ms',
//     fillMode: 'backwards',
//     timingFunction: 'ease-in-out',
//   }
// );

jsCssAnimations.motion.rotateUpCw({
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.my-custom-btn img',
  // toggleSelector: '.content p:nth-child(2)',
  duration: '400ms',
  timingFunction: 'ease-in-out',
  start: () => {
    const elem = document.querySelector('.content p:nth-child(1)');
    jsCssAnimations.moveBack.rotateUpCw(elem, { duration: '2000ms' });
    // const img = document.querySelector('.my-custom-btn img');
    // const rotateClass = [...img.classList].find(cl => cl.match(/rotate/));
    // if (!rotateClass || rotateClass === 'rotate-cw') {
    //   // jsCssAnimations.move.rotateUpCw(img, { duration: '2000ms' });
    // } else if (rotateClass === 'rotate-ccw') {
    //   // img.classList.add('rotate-cw');
    // }
    // if (rotateClass) img.classList.remove(rotateClass);
  },
});

const elem = document.querySelector('.content p:nth-child(1)');
jsCssAnimations.move.rotateUpCw(elem, { duration: '2000ms' });
// jsCssAnimations.animate(
//   'rotateUpCw',
//   {
//     toggleBtn: '.my-custom-btn',
//     toggleSelector: '.my-custom-btn img',
//   },
//   'motion'
// );

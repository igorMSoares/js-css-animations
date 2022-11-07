import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.animate('slideDown', {
  // complete: () => {
  //   const btn = document.querySelector('.my-custom-btn img');
  //   jsCssAnimations.show.slideLeft(btn, {
  //     timingFunction: 'ease-in-out',
  //   });
  // },
});

// jsCssAnimations.show.slideDown(
//   document.querySelector('.content p:nth-child(1)'),
//   {
//     delay: '400ms',
//     fillMode: 'backwards',
//     timingFunction: 'ease-in-out',
//   }
// );

jsCssAnimations.animate('fade', {
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.content p:nth-child(2)',
  duration: '400ms',
  timingFunction: 'ease-in-out',
  // start: () => {
  //   const img = document.querySelector('.my-custom-btn img');
  //   const rotateClass = [...img.classList].find(cl => cl.match(/rotate/));
  //   if (!rotateClass || rotateClass === 'rotate-cw') {
  //     img.classList.add('rotate-ccw');
  //   } else if (rotateClass === 'rotate-ccw') {
  //     img.classList.add('rotate-cw');
  //   }
  //   if (rotateClass) img.classList.remove(rotateClass);
  // },
});

// jsCssAnimations.animate(
//   'rotateUpCw',
//   {
//     toggleBtn: '.my-custom-btn',
//     toggleSelector: '.my-custom-btn img',
//   },
//   'motion'
// );

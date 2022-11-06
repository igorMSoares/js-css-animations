import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.animate('slideDown', {
  complete: () => {
    const img = document.querySelector('.my-custom-btn img');
    jsCssAnimations.show.slideLeft(img, {
      duration: '100ms',
      timingFunction: 'ease-in-out',
    });
  },
});
jsCssAnimations.animate('slideRight', {
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.content p:nth-child(2)',
  cursor: 'default',
  duration: '1500ms',
  timingFunction: 'ease-in-out',
  start: () => {
    const img = document.querySelector('.my-custom-btn img');
    const rotateClass = [...img.classList].find(cl => cl.match(/rotate/));
    if (!rotateClass || rotateClass === 'rotate-cw') {
      img.classList.add('rotate-ccw');
    } else if (rotateClass === 'rotate-ccw') {
      img.classList.add('rotate-cw');
    }
    if (rotateClass) img.classList.remove(rotateClass);
  },
  complete: () => {
    const img = document.querySelector('.my-custom-btn img');
    jsCssAnimations.hide.slideLeft(img, {
      duration: '1000ms',
      timingFunction: 'ease',
    });
  },
});

jsCssAnimations.show.slideDown(
  document.querySelector('.content p:nth-child(1)')
);

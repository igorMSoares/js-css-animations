import initAnimations from './js-css-animations/js-css-animations.js';

initAnimations('slideDown');
initAnimations('slideRight', {
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
});

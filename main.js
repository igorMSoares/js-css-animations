import initAnimations from './js-css-animations/js-css-animations.js';

initAnimations('slideDown');
initAnimations('slideRight', {
  toggleBtn: '.my-custom-btn',
  toggleSelector: '.content p:nth-child(2)',
  cursor: 'default',
  duration: '1500ms',
  timingFunction: 'ease-in-out',
});

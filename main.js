import initAnimations from './js-css-animations/js-css-animations.js';

initAnimations('slideDown');
initAnimations('slideRight', {
  toggleBtn: '.my-custom-btn',
  cursor: 'default',
  duration: '1500ms',
  timingFunction: 'ease-in-out',
});

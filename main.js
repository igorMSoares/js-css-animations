import initAnimations from './toggle.js';

initAnimations('slideDown');
initAnimations('slideRight', {
  toggleBtn: '.my-custom-btn',
  cursor: 'default',
  duration: '1500ms',
  timingFunction: 'ease-in-out',
});

import jsCssAnimations from './js-css-animations/js-css-animations.js';

jsCssAnimations.init.slideUp({
  toggleBtn: '.btn--slide-up',
  staggerDelay: 500,
  duration: '1s',
  start: () => {
    jsCssAnimations.toggle('#anchor img', 'rotateDownCCW', 'rotateUp');
  },
});

jsCssAnimations.init.slideRight({
  toggleBtn: '.btn--slide-right',
  start: () => {
    jsCssAnimations.toggle('#anchor2 img', 'rotateRight', 'rotateUp');
  },
});

jsCssAnimations.init.slideDown({
  toggleBtn: '.btn--slide-down',
  delay: '1.5s',
  start: () => {
    document.querySelector('.delay-counter').innerText = '1.5 seconds Delay';
    jsCssAnimations.show.collapse('.delay-counter', {
      hide: true,
    });
  },
  complete: () => {
    jsCssAnimations.hide.fade('.delay-counter', {
      hide: true,
      complete: () => {
        document.querySelector('.delay-counter').innerText = '';
      },
    });
    jsCssAnimations.toggle('img', 'rotateDownCCW', 'rotateUp');
  },
});

jsCssAnimations.init.slideLeft({
  toggleBtn: '.btn--slide-left',
  staggerDelay: 500,
  start: () => {
    jsCssAnimations.toggle('img', 'rotateLeftCCW', 'rotateUp', {
      staggerDelay: 400,
    });
  },
});

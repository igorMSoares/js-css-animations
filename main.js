import initAnimations from './toggle.js';

initAnimations('expand-collapse', {
  duration: {
    toggleHeight: { collapse: 500 },
    total: { expand: 800, collapse: 1000 },
  },
});
// initAnimations('expand-collapse');

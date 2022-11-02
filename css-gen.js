const style = document.createElement('style');

style.innerHTML = `
@keyframes js-anim--collapse {
  from {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 50% 0;
  }
}

@keyframes js-anim--expand {
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 50% 0;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

.js-anim--mxhgt-transition {
  transition: max-height 500ms ease;
}

.js-anim--expand {
  animation: js-anim--expand 500ms ease;
  animation-fill-mode: forwards;
  transition: transform 500ms ease-in-out;
}

.js-anim--collapse {
  animation: js-anim--collapse 500ms ease;
  animation-fill-mode: forwards;
  transition: transform 500ms ease-in-out;
}

.js-anim--collapsed {
  display: none;
}
`;

document.querySelector('head').appendChild(style);

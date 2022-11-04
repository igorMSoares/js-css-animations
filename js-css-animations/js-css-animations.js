import {
  getParentMeasures,
  setParentMaxMeasures,
  removeDimensionMax,
} from './measurements.js';

const animationsId = {
  collapse: 0,
  slideUp: 1,
  slideDown: 2,
  slideLeft: 3,
  slideRight: 4,
};

const propertyNames = {
  duration: '--js-css-animation--duration',
  timingFunction: '--js-css-animation--timing-function',
  cursor: '--js-css-animation--cursor',
};

const classNames = {
  dimensionsTransitions: 'js-anim--dimensions-transitions',
  heightTransition: 'js-anim--height-transition',
  widthTransition: 'js-anim--width-transition',
  toggleBtn: 'js-anim--toggle-btn',
  btnCursor: 'js-anim--btn-cursor',
  collapsed: 'js-anim--collapsed',
  hide: [
    'js-anim--collapse',
    'js-anim--slide-up',
    'js-anim--slide-down',
    'js-anim--slide-left',
    'js-anim--slide-right',
  ],
  show: [
    'js-anim--expand',
    'js-anim--slide-up__back',
    'js-anim--slide-down__back',
    'js-anim--slide-left__back',
    'js-anim--slide-right__back',
  ],
};

const getCustomProperties = () => ['duration', 'timingFunction'];

const getRootProperty = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    propertyNames[property]
  );
};

const setParentCssProperties = element => {
  let currentProp;
  getCustomProperties().forEach(prop => {
    currentProp = getComputedStyle(element).getPropertyValue(
      propertyNames[prop]
    );

    if (currentProp !== getRootProperty(prop)) {
      element.parentElement.style.setProperty(propertyNames[prop], currentProp);
    }
  });
};

const removeParentCssProperties = element => {
  getCustomProperties().forEach(prop => {
    element.parentElement.style.removeProperty(propertyNames[prop]);
  });
};

const setCssProperty = (element, property, value) => {
  element.style.setProperty(propertyNames[property], value);
};

const updateCssProperties = (element, opts) => {
  getCustomProperties().forEach(prop => {
    if (opts[prop] && typeof opts[prop] === 'string') {
      setCssProperty(element, prop, opts[prop]);
    }
  });
};

const setDimensionsTransitions = (element, wTransit, hTransit) => {
  if (wTransit && hTransit)
    element.classList.add(classNames.dimensionsTransitions);
  else if (wTransit) element.classList.add(classNames.widthTransition);
  else if (hTransit) element.classList.add(classNames.heightTransition);
};

const getToggleSelector = eventTarget => {
  let toggleBtn = eventTarget;
  while (toggleBtn && !toggleBtn.getAttribute('toggle-selector')) {
    /** bubbles up untill the attribute is found */
    toggleBtn = toggleBtn.parentElement;
  }

  if (!toggleBtn)
    throw new ReferenceError('toggle-selector attribute not found');

  return toggleBtn.getAttribute('toggle-selector');
};

const animate = (element, action, id, opts = {}) => {
  element.setAttribute('disabled', 'true');
  const { complete, start } = opts;
  const duration = Number(
    getComputedStyle(element)
      .getPropertyValue(propertyNames.duration)
      .match(/\d+/)
  );

  setParentCssProperties(element);

  const oppositeAction = {
    hide: 'show',
    show: 'hide',
  };
  const parentMeasures = getParentMeasures(element);

  setParentMaxMeasures({ element, parentMeasures, action });
  if (start && typeof start === 'function') start();
  element.classList.add(classNames[action][id]);
  element.classList.remove(classNames[oppositeAction[action]][id]);

  setTimeout(() => {
    setParentMaxMeasures({
      parentState: 'final',
      element,
      parentMeasures,
      action,
    });
    if (action === 'show') {
      element.classList.remove(classNames.collapsed);
    }
  }, 0);

  setTimeout(() => {
    if (action === 'hide') {
      element.classList.add(classNames.collapsed);
    }
    removeDimensionMax(element.parentElement, 'height');
    removeDimensionMax(element.parentElement, 'width');
    setTimeout(() => element.removeAttribute('disabled'), 100);
    removeParentCssProperties(element);
    if (complete && typeof complete === 'function') complete();
  }, duration);
};

const eventHandler = (triggerBtn, id, opts = {}) => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = classList.find(c => c === classNames.collapsed)
      ? 'show'
      : 'hide';

    if (!element.getAttribute('disabled')) animate(element, action, id, opts);
  });
};

const init = (animationId, opts = {}) => {
  const {
    toggleBtn = `.${classNames.toggleBtn}`,
    toggleSelector,
    cursor,
    widthTransition = true,
    heightTransition = true,
    start,
    complete,
  } = opts;

  document.querySelectorAll(toggleBtn).forEach(btn => {
    btn.classList.add(classNames.btnCursor);
    if (cursor && typeof cursor === 'string') {
      setCssProperty(btn, 'cursor', cursor);
    }
    if (toggleSelector && typeof toggleSelector === 'string') {
      btn.setAttribute('toggle-selector', toggleSelector);
    }

    document.querySelectorAll(getToggleSelector(btn)).forEach(el => {
      updateCssProperties(el, opts);
      setDimensionsTransitions(
        el.parentElement,
        widthTransition,
        heightTransition
      );
    });

    btn.addEventListener('click', e =>
      eventHandler(e.target, animationId, { start, complete })
    );
  });
};

const initAnimations = (type, opts) => {
  init(animationsId[type], opts);
};

export default initAnimations;

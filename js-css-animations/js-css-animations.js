import {
  getParentMeasures,
  setParentMaxMeasures,
  removeDimensionMax,
} from './measurements.js';

const ANIMATIONS_ID = {
  collapse: 0,
  slideUp: 1,
  slideDown: 2,
  slideLeft: 3,
  slideRight: 4,
};
Object.freeze(ANIMATIONS_ID);

const PROPERTY_NAMES = {
  duration: '--js-css-animation--duration',
  timingFunction: '--js-css-animation--timing-function',
  cursor: '--js-css-animation--cursor',
};
Object.freeze(PROPERTY_NAMES);

const CLASS_NAMES = Object.freeze({
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
});

const getCustomCssProperties = () => ['duration', 'timingFunction'];

const getRootCssProperty = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    PROPERTY_NAMES[property]
  );
};

const setParentCssProperties = element => {
  let currentProp;
  getCustomCssProperties().forEach(prop => {
    currentProp = getComputedStyle(element).getPropertyValue(
      PROPERTY_NAMES[prop]
    );

    if (currentProp !== getRootCssProperty(prop)) {
      element.parentElement.style.setProperty(
        PROPERTY_NAMES[prop],
        currentProp
      );
    }
  });
};

const removeParentCssProperties = element => {
  getCustomCssProperties().forEach(prop => {
    element.parentElement.style.removeProperty(PROPERTY_NAMES[prop]);
  });
};

const setCssProperty = (element, property, value) => {
  element.style.setProperty(PROPERTY_NAMES[property], value);
};

const updateCssProperties = (element, opts) => {
  getCustomCssProperties().forEach(prop => {
    if (typeof opts[prop] === 'string') {
      setCssProperty(element, prop, opts[prop]);
    }
  });
};

const getCurrentTransition = element => {
  const currTransition = getComputedStyle(element).transition;
  return currTransition !== getDefaultComputedStyle(element).transition
    ? currTransition
    : '';
};

const getClassTransition = className => {
  return [
    ...[...document.styleSheets].find(ss => ss.href.match(/js-animations\.css/))
      .cssRules,
  ].find(r => r.cssText.match(`\\.${className}`)).style.transition;
};

const appendTransition = (element, className, currTransition) => {
  const classTransition = getClassTransition(className);
  if (classTransition) {
    element.style.setProperty(
      'transition',
      `${classTransition}, ${currTransition}`
    );
  }
};

const setDimensionsTransitions = (element, wTransit, hTransit) => {
  const currTransition = getCurrentTransition(element);
  let className;

  if (wTransit && hTransit) {
    className = CLASS_NAMES.dimensionsTransitions;
  } else if (wTransit) {
    className = CLASS_NAMES.widthTransition;
  } else if (hTransit) {
    className = CLASS_NAMES.heightTransition;
  }

  if (className) element.classList.add(className);
  if (currTransition) appendTransition(element, className, currTransition);
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

const callbackTracker = {
  executing: {},
};
Object.freeze(callbackTracker);

const animate = (element, action, id, opts = {}) => {
  element.setAttribute('disabled', 'true');
  const { complete, start, toggleBtn } = opts;
  const duration = Number(
    getComputedStyle(element)
      .getPropertyValue(PROPERTY_NAMES.duration)
      .match(/\d+/)
  );

  setParentCssProperties(element);

  const oppositeAction = {
    hide: 'show',
    show: 'hide',
  };
  const parentMeasures = getParentMeasures(element);
  setParentMaxMeasures({ element, parentMeasures, action });

  if (typeof start === 'function' && !callbackTracker.executing[toggleBtn]) {
    start();
  }

  element.classList.add(CLASS_NAMES[action][id]);
  element.classList.remove(CLASS_NAMES[oppositeAction[action]][id]);

  setTimeout(() => {
    setParentMaxMeasures({
      parentState: 'final',
      element,
      parentMeasures,
      action,
    });
    if (action === 'show') {
      element.classList.remove(CLASS_NAMES.collapsed);
    }
  }, 0);

  setTimeout(() => {
    if (action === 'hide') {
      element.classList.add(CLASS_NAMES.collapsed);
    }
    removeDimensionMax(element.parentElement, 'height');
    removeDimensionMax(element.parentElement, 'width');
    setTimeout(() => element.removeAttribute('disabled'), 100);
    removeParentCssProperties(element);

    if (
      typeof complete === 'function' &&
      !callbackTracker.executing[toggleBtn]
    ) {
      complete();
    }

    delete callbackTracker.executing[toggleBtn];
  }, duration);

  if (!callbackTracker.executing[toggleBtn])
    callbackTracker.executing[toggleBtn] = true;
};

const eventHandler = (triggerBtn, id, opts = {}) => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = classList.find(c => c === CLASS_NAMES.collapsed)
      ? 'show'
      : 'hide';

    if (!element.getAttribute('disabled')) animate(element, action, id, opts);
  });
};

const init = (animationId, opts = {}) => {
  const {
    toggleBtn = `.${CLASS_NAMES.toggleBtn}`,
    toggleSelector,
    cursor,
    widthTransition = true,
    heightTransition = true,
    start,
    complete,
  } = opts;

  document.querySelectorAll(toggleBtn).forEach(btn => {
    btn.classList.add(CLASS_NAMES.btnCursor);
    if (typeof cursor === 'string') {
      setCssProperty(btn, 'cursor', cursor);
    }
    if (typeof toggleSelector === 'string') {
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

    btn.addEventListener('click', e => {
      e.stopPropagation();
      eventHandler(e.target, animationId, { start, complete, toggleBtn });
    });
  });
};

const initAnimations = (type, opts) => {
  init(ANIMATIONS_ID[type], opts);
};

export default initAnimations;

import {
  getParentMeasures,
  setParentMaxMeasures,
  removeDimensionMax,
} from './measurements.js';

const VISIBILITY_ANIMS_ID = Object.freeze({
  collapse: 0,
  slideUp: 1,
  slideDown: 2,
  slideLeft: 3,
  slideRight: 4,
  fade: 5,
  rotateUpCw: 6,
  rotateUpCCw: 7,
});

const MOTION_ANIMS_ID = Object.freeze({
  rotateUpCw: 0,
  rotateUpCCw: 1,
});

const PROPERTY_NAMES = Object.freeze({
  duration: '--js-css-animation--duration',
  timingFunction: '--js-css-animation--timing-function',
  delay: '--js-css-animation--delay',
  fillMode: '--js-css-animation--fill-mode',
  cursor: '--js-css-animation--cursor',
  blur: '--js-css-animation--blur',
});

const CLASS_NAMES = Object.freeze({
  dimensionsTransitions: 'js-anim--dimensions-transitions',
  heightTransition: 'js-anim--height-transition',
  widthTransition: 'js-anim--width-transition',
  toggleBtn: 'js-anim--toggle-btn',
  btnCursor: 'js-anim--btn-cursor',
  collapsed: 'js-anim--collapsed',
  hidden: 'js-anim--hidden',
  hide: [
    'js-anim--collapse',
    'js-anim--slide-up',
    'js-anim--slide-down',
    'js-anim--slide-left',
    'js-anim--slide-right',
    'js-anim--fade-out',
  ],
  show: [
    'js-anim--expand',
    'js-anim--slide-up__back',
    'js-anim--slide-down__back',
    'js-anim--slide-left__back',
    'js-anim--slide-right__back',
    'js-anim--fade-in',
  ],
  move: ['js-anim--rotate-up__cw', 'js-anim--rotate-up__ccw'],
  moveBack: ['js-anim--rotate-up__cw__back', 'js-anim--rotate-up__ccw__back'],
});

const CALLBACK_TRACKER = Object.freeze({
  executing: {},
});

const CUSTOM_CSS_PROPERTIES = Object.freeze(
  Object.keys(PROPERTY_NAMES).filter(k => k !== 'cursor')
);

const getRootCssProperty = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    PROPERTY_NAMES[property]
  );
};

const setParentCssProperties = element => {
  let currentProp;
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    currentProp = getComputedStyle(element).getPropertyValue(
      PROPERTY_NAMES[prop]
    );

    if (currentProp !== getRootCssProperty(prop)) {
      setCssProperty(element.parentElement, PROPERTY_NAMES[prop], currentProp);
    }
  });
};

const removeCustomCssProperties = element => {
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    element.style.removeProperty(PROPERTY_NAMES[prop]);
  });
};

const setCssProperty = (element, property, value) => {
  element.style.setProperty(PROPERTY_NAMES[property], value);
};

const updateCssProperties = (element, opts) => {
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
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

const getTotalAnimTime = element => {
  const total = {};
  ['duration', 'delay'].forEach(prop => {
    total[prop] = Number(
      getComputedStyle(element)
        .getPropertyValue(PROPERTY_NAMES[prop])
        .match(/\d+/)
    );
  });
  return total;
};

const isVisibilityAnim = animType => animType === 'visibility';

const animateV2 = (animType, element, action, id, opts = {}) => {
  element.setAttribute('js-anim--disabled', 'true');
  const { complete, start, toggleBtn, resetAfter } = opts;

  if (!CALLBACK_TRACKER.executing[toggleBtn])
    CALLBACK_TRACKER.executing[toggleBtn] = {};

  const { duration, delay } = getTotalAnimTime(element);
  let parentMeasures, dimension, hide;

  if (isVisibilityAnim(animType)) {
    hide = opts.hide;
    const { widthTransition = true, heightTransition = true } = opts;
    setParentCssProperties(element);

    if (widthTransition && heightTransition) dimension = 'all';
    else if (widthTransition) dimension = 'width';
    else if (heightTransition) dimension = 'height';
    parentMeasures = getParentMeasures(element);
    setParentMaxMeasures({ element, parentMeasures, action, dimension });
  }

  const oppositeAction = {
    hide: 'show',
    show: 'hide',
    move: 'moveBack',
    moveBack: 'move',
  };

  if (
    typeof start === 'function' &&
    !CALLBACK_TRACKER.executing[toggleBtn].start
  ) {
    CALLBACK_TRACKER.executing[toggleBtn].start = true;
    start();
  }

  element.classList.add(CLASS_NAMES[action][id]);
  element.classList.remove(CLASS_NAMES[oppositeAction[action]][id]);

  if (isVisibilityAnim(animType)) {
    setTimeout(() => {
      setParentMaxMeasures({
        parentState: 'final',
        element,
        parentMeasures,
        action,
        dimension,
      });
      if (action === 'show' && id < 6) {
        hide
          ? element.classList.remove(CLASS_NAMES.hidden)
          : element.classList.remove(CLASS_NAMES.collapsed);
      }
    }, delay);
  }

  setTimeout(() => {
    if (isVisibilityAnim(animType)) {
      if (action === 'hide' && id < 6) {
        hide
          ? element.classList.add(CLASS_NAMES.hidden)
          : element.classList.add(CLASS_NAMES.collapsed);
      }
      removeDimensionMax(element.parentElement, 'height');
      removeDimensionMax(element.parentElement, 'width');
      removeCustomCssProperties(element.parentElement);
    }

    setTimeout(() => element.removeAttribute('js-anim--disabled'), 100);

    if (
      typeof complete === 'function' &&
      !CALLBACK_TRACKER.executing[toggleBtn].complete
    ) {
      CALLBACK_TRACKER.executing[toggleBtn].complete = true;
      complete();
      setTimeout(() => {
        delete CALLBACK_TRACKER.executing[toggleBtn];
      }, delay);
    }

    setTimeout(() => {
      if (resetAfter) removeCustomCssProperties(element);
    }, duration + delay);
  }, duration + delay);
};

const animate = (element, action, id, opts = {}) => {
  element.setAttribute('js-anim--disabled', 'true');
  const {
    complete,
    start,
    toggleBtn,
    hide,
    widthTransition = true,
    heightTransition = true,
    resetAfter,
  } = opts;

  if (!CALLBACK_TRACKER.executing[toggleBtn])
    CALLBACK_TRACKER.executing[toggleBtn] = {};

  const { duration, delay } = getTotalAnimTime(element);

  setParentCssProperties(element);

  let dimension;
  if (widthTransition && heightTransition) dimension = 'all';
  else if (widthTransition) dimension = 'width';
  else if (heightTransition) dimension = 'height';
  const parentMeasures = getParentMeasures(element);
  setParentMaxMeasures({ element, parentMeasures, action, dimension });

  const oppositeAction = {
    hide: 'show',
    show: 'hide',
  };

  if (
    typeof start === 'function' &&
    !CALLBACK_TRACKER.executing[toggleBtn].start
  ) {
    CALLBACK_TRACKER.executing[toggleBtn].start = true;
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
      dimension,
    });
    if (action === 'show') {
      hide
        ? element.classList.remove(CLASS_NAMES.hidden)
        : element.classList.remove(CLASS_NAMES.collapsed);
    }
  }, delay);

  setTimeout(() => {
    if (action === 'hide') {
      hide
        ? element.classList.add(CLASS_NAMES.hidden)
        : element.classList.add(CLASS_NAMES.collapsed);
    }
    removeDimensionMax(element.parentElement, 'height');
    removeDimensionMax(element.parentElement, 'width');
    setTimeout(() => element.removeAttribute('js-anim--disabled'), 100);
    removeCustomCssProperties(element.parentElement);

    if (
      typeof complete === 'function' &&
      !CALLBACK_TRACKER.executing[toggleBtn].complete
    ) {
      CALLBACK_TRACKER.executing[toggleBtn].complete = true;
      complete();
      setTimeout(() => {
        delete CALLBACK_TRACKER.executing[toggleBtn];
      }, 0);
    }

    setTimeout(() => {
      if (resetAfter) removeCustomCssProperties(element);
    }, duration + delay);
  }, duration + delay);
};

const eventHandler = (triggerBtn, id, animType, opts = {}) => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = isVisibilityAnim(animType)
      ? classList.find(
          c => c === CLASS_NAMES.collapsed || c === CLASS_NAMES.hidden
        )
        ? 'show'
        : 'hide'
      : classList.find(c => c.match(/rotate.+back/))
      ? 'move'
      : classList.find(c => c.match(/rotate/))
      ? 'moveBack'
      : 'move';

    if (!element.getAttribute('js-anim--disabled'))
      animateV2(animType, element, action, id, opts);
  });
};

const init = (animationId, opts = {}, animationType = 'visibility') => {
  const {
    toggleBtn = `.${CLASS_NAMES.toggleBtn}`,
    toggleSelector,
    cursor,
    widthTransition = true,
    heightTransition = true,
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
      if (isVisibilityAnim(animationType)) {
        setDimensionsTransitions(
          el.parentElement,
          widthTransition,
          heightTransition
        );
      }
    });

    btn.addEventListener('click', e => {
      e.stopPropagation();
      eventHandler(e.target, animationId, animationType, opts);
    });
  });
};

const jsCssAnimations = (function () {
  const animationHandlers = (function () {
    const motion = (() => {
      return {};
    })();

    const handlers = {};
    ['show', 'hide'].forEach(action => {
      handlers[action] = {};
      for (const [animName, animId] of Object.entries(VISIBILITY_ANIMS_ID)) {
        handlers[action][animName] = (element, opts = {}) => {
          const {
            widthTransition = false,
            heightTransition = false,
            hide = true,
            resetAfter = true,
          } = opts;

          updateCssProperties(element, opts);
          animate(element, action, animId, {
            widthTransition,
            heightTransition,
            hide,
            resetAfter,
          });
        };
      }
    });

    return handlers;
  })();

  return Object.freeze({
    animate: (animName, opts, animType = 'visibility') => {
      const animId = isVisibilityAnim(animType)
        ? VISIBILITY_ANIMS_ID[animName]
        : MOTION_ANIMS_ID[animName];

      init(animId, opts, animType);
    },
    hide: animationHandlers.hide,
    show: animationHandlers.show,
  });
})();

export default jsCssAnimations;

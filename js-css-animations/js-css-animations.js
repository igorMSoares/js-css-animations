import {
  VISIBILITY_ANIMS_ID,
  MOTION_ANIMS_ID,
  PROPERTY_NAMES,
  CLASS_NAMES,
  CUSTOM_CSS_PROPERTIES,
} from './globals.js';

import {
  initParentTransitions,
  handleVisibilityToggle,
  endVisibilityToggle,
  setDimensionsTransitions,
} from './dimensions.js';

const CALLBACK_TRACKER = Object.freeze({
  executing: {},
});

export const removeCustomCssProperties = element => {
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    element.style.removeProperty(PROPERTY_NAMES[prop]);
  });
};

export const setCssProperty = (element, property, value) => {
  element.style.setProperty(PROPERTY_NAMES[property], value);
};

const updateCssProperties = (element, opts) => {
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    if (typeof opts[prop] === 'string') {
      setCssProperty(element, prop, opts[prop]);
    }
  });
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

const isVisibility = animType => animType === 'visibility';

const animate = (animType, element, action, id, opts = {}) => {
  element.setAttribute('js-anim--disabled', 'true');
  const { complete, start, toggleBtn, resetAfter, hide } = opts;
  const { duration, delay } = getTotalAnimTime(element);
  const OPPOSITE_ACTION = Object.freeze({
    hide: 'show',
    show: 'hide',
    move: 'moveBack',
    moveBack: 'move',
  });
  let parentMeasures, dimension;

  if (!CALLBACK_TRACKER.executing[toggleBtn])
    CALLBACK_TRACKER.executing[toggleBtn] = {};

  if (isVisibility(animType)) {
    const { widthTransition = true, heightTransition = true } = opts;
    ({ parentMeasures, dimension } = initParentTransitions({
      element,
      action,
      widthTransition,
      heightTransition,
    }));
  }

  if (
    typeof start === 'function' &&
    !CALLBACK_TRACKER.executing[toggleBtn].start
  ) {
    CALLBACK_TRACKER.executing[toggleBtn].start = true;
    start();
  }

  element.classList.add(CLASS_NAMES[action][id]);
  element.classList.remove(CLASS_NAMES[OPPOSITE_ACTION[action]][id]);

  if (isVisibility(animType)) {
    setTimeout(() => {
      handleVisibilityToggle(element, {
        parentState: 'final',
        element,
        parentMeasures,
        action,
        dimension,
        hide,
      });
    }, delay);
  }

  setTimeout(() => {
    if (isVisibility(animType)) {
      endVisibilityToggle(element, action, hide);
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

const eventHandler = (triggerBtn, id, animType, opts = {}) => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = isVisibility(animType)
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
      animate(animType, element, action, id, opts);
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
      if (isVisibility(animationType)) {
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
      const animId = isVisibility(animType)
        ? VISIBILITY_ANIMS_ID[animName]
        : MOTION_ANIMS_ID[animName];

      init(animId, opts, animType);
    },
    hide: animationHandlers.hide,
    show: animationHandlers.show,
  });
})();

export default jsCssAnimations;

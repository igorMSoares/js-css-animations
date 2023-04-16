/**
 * Handles all the animation process
 * @module animate
 */
import {
  MOTION_ANIMS_ID,
  PROPERTY_NAMES,
  CLASS_NAMES,
  CUSTOM_CSS_PROPERTIES,
} from './globals.js';

/**
 * Contains the default value for each custom option.
 * Those values can be overwritten by the user by calling jsCssAnimations.config()
 * and passing new default values for all the animations.
 * @type {Object.<string,any>}
 */
const configurations = {
  default: Object.freeze({
    trigger: `.${CLASS_NAMES.trigger}`,
    targetSelector: undefined,
    staggerDelay: undefined,
    start: undefined,
    complete: undefined,
    maintainSpace: false,
    dimensionsTransition: true,
    widthTransition: undefined,
    heightTransition: undefined,
    overflowHidden: true,
    stopPropagation: true,
    preventDefault: true,
    on: 'click',
  }),
};

/**
 * ProxyHandler passed to the 'CONFIG' object to ensure that
 * if an option is not customized by the user, the default value set
 * in 'configurations.default' will be returned instead.
 * @see {@link CONFIG}
 * @see {@link configurations}
 */
const configHandler = {
  /**
   * @param {Object.<string, Function>} configurations - Contains the configuration options
   * @param {string} option - Key name of the configuration option
   */
  get(configurations, option) {
    if (!(option in configurations)) return configurations.default[option];
    else return configurations[option];
  },
  /**
   * @param {Object.<string, Function>} configurations - Contains the configuration options
   * @param {string} option - Key name of the configuration option
   * @param {any} value - Configuration option value
   */
  set(configurations, option, value) {
    configurations[option] = value;
    return true;
  },
};

/**
 * Object that handles configurations, either customized by the user
 * or default values defined in 'configurations.default' object
 * @type {Object.<string,any>}
 * @see {@link configurations}
 */
const CONFIG = new Proxy(configurations, configHandler);

/** Matches duration or delay CSS properties values */
const DURATION_REGEX = Object.freeze(new RegExp(/(\d?\.\d+|\d+)(ms|s)?/));

/**
 * Keeps track of the callbacks being executed, preventing the callbacks to be executed
 * multiple times if multiple elements are being animated by a single trigger.
 *
 * When an element triggers an animation, no matter how many elements are being animated,
 * the start() and complete() callbacks should each be executed only once.
 * @type {{
 *  executing: Object.<string, Object<string, boolean>>,
 *  init: Function,
 *  remove: Function
 * }}
 */
const CALLBACK_TRACKER = Object.freeze({
  executing: {},
  /**
   * Initiates the tracker
   * @param {string} trigger - A CSS selector representing the element which triggered the animation
   */
  init: function (trigger) {
    CALLBACK_TRACKER.executing[trigger] = {};
  },
  /**
   * Removes 'trigger' from the tracker
   * @param {string} trigger - A CSS selector representing the element which triggered the animation
   */
  remove: function (trigger) {
    delete this.executing[trigger];
  },
});

/**
 * Keeps track of all the targets being animated to ensure that the callback tracker
 * will be removed only when all the targets have been animated. Also ensures that
 * all targets will be re-enabled only when all targets have already been animated.
 * @type {{add: Function, remove: Function, get: Function, stack: Object.<string, HTMLElement[]>}}
 */
const TARGETS_STACK = {
  /**
   * Adds an element to the stack
   * @param {HTMLElement} elem - Element being animated
   * @param {string} trigger - CSS selector for the element that triggered the animation
   */
  add: function (elem, trigger) {
    if (!(trigger in this.stack)) this.stack[trigger] = [];
    this.stack[trigger].push(elem);
  },
  /**
   * Removes from the stack all the elements animated by the same trigger button
   * @param {string} trigger - CSS selector for the element that triggered the animation
   */
  remove: function (trigger) {
    if (!(trigger in this.stack)) return;
    delete this.stack[trigger];
  },
  /**
   * Gets all elements included in the stack for a given trigger button
   * @param {string} trigger - CSS selector for the element that triggered the animation
   * @returns An array of elements that have been animated by the same trigger button
   */
  get: function (trigger) {
    if (!(trigger in this.stack)) return;
    return this.stack[trigger];
  },
  stack: {},
};

/**
 * Keeps track of the EventListeners associated to a trigger selector
 * @type {{[x: String]: EventListener[]}}
 */
const LISTENERS = {};

/**
 * Removes the CSS properties customized by the user
 * @param {HTMLElement} element - The DOM element with the custom CSS properties
 */
export const removeCustomCssProperties = element => {
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    element.style.removeProperty(PROPERTY_NAMES[prop]);
  });
};

/**
 * Customize the default animations configurations by overwriting
 * the 'CONFIG' values
 * @param {Object} opts - All the options customized by the user
 * @see {@link CONFIG}
 */
const updateDefaultConfig = opts => {
  for (let option in CONFIG.default) {
    if (opts[option] !== undefined) {
      CONFIG[option] = opts[option];
    }
  }
};

/**
 * Reset the configurations to its default values
 * by removing from 'CONFIG' all options customized by the user
 * @see {@link CONFIG}
 */
const resetDefaultConfig = () => {
  for (let option in CONFIG.default) {
    delete CONFIG[option];
  }
};

/**
 * Sets an inline CSS property
 * @param {HTMLElement} element - The DOM element which will receive the property
 * @param {string} property - Property key in the PROPERTY_NAMES object
 * @param {string} value - Value of the CSS Property
 * @see {@link module:globals.PROPERTY_NAMES}
 */
export const setCssProperty = (element, property, value) => {
  element.style.setProperty(PROPERTY_NAMES[property], value);
};

/**
 * Sets the CSS properties customized by the user in the animation function's options
 * @param {HTMLElement} element - The DOM element to update the CSS Properties
 * @param {Object.<string, string>} opts - Object containing a custom property key and a CSS value to be updated
 */
const updateCssProperties = async (element, opts) => {
  removeCustomCssProperties(element);
  if (element !== document.documentElement) {
    const { removeInlineTransition } = await import('./transitions.js');
    removeInlineTransition(element);
  }
  CUSTOM_CSS_PROPERTIES.forEach(prop => {
    if (typeof opts[prop] === 'string' || typeof opts[prop] === 'number') {
      if (typeof opts[prop] === 'number') {
        const unit = {
          duration: 'ms',
          delay: 'ms',
          angle: 'deg',
          blur: 'px',
          iteration: '',
          initialScale: '',
          finalScale: '',
        };

        opts[prop] = `${opts[prop]}` + unit[prop];
      }
      setCssProperty(element, prop, opts[prop]);
    }
  });
};

/**
 * Searches and returns the 'target-selector' attribute
 *
 * If the element which triggered the event doesn't have the attribute,
 * will bubbles up untill the attribute is found.
 * If no attribute is found, an empty string is returned and so
 * no element will be selected to be animated
 * @param {HTMLElement} eventTarget - The DOM element wich triggers the event
 * @returns The CSS selector for the animation target(s) or an empty string
 */
const getTargetSelector = eventTarget => {
  /** @type {HTMLElement|null} */
  let trigger = eventTarget;
  while (trigger && !trigger.getAttribute('target-selector')) {
    /** bubbles up untill the attribute is found */
    trigger = trigger.parentElement;
  }

  if (!trigger) throw new ReferenceError('target-selector attribute not found');

  return trigger.getAttribute('target-selector') ?? '';
};

/**
 * Removes the unit from the duration or delay and returns the value in milliseconds
 * @param {string} value - duration or delay CSS property value
 * @returns The duration or delay in milliseconds
 */
const getTimeInMs = value => {
  if (value === undefined) return 0;
  if (typeof value === 'number') return value;
  let match = value.match(DURATION_REGEX) ?? [0, 0];
  return match.at(-1) === 's' ? Number(match[1]) * 1000 : Number(match[1]);
};

/**
 * Returns an object with the duration and delay time in milliseconds
 * @param {HTMLElement} element - The DOM element being animated
 * @returns Both the duration and delay, in milliseconds
 */
const getTotalAnimTime = element => {
  const total = {};
  ['duration', 'delay'].forEach(prop => {
    total[prop] = getTimeInMs(
      getComputedStyle(element).getPropertyValue(PROPERTY_NAMES[prop])
    );
  });
  return total;
};

/**
 * Returns true if the animation type is 'visibility'
 * @param {string} animType - Either 'motion' or 'visibility'
 * @returns True if animation type is 'visibility'. False otherwise.
 */
const isVisibility = animType => animType === 'visibility';
/**
 * Returns true if the animation type is 'motion'
 * @param {string} animType - Either 'motion' or 'visibility'
 * @returns True if animation type is 'motion'. False otherwise.
 */
const isMotion = animType => animType === 'motion';

/**
 * Sets an attribute to indicate that the element is currently being animated
 * and so can not perform any other animations
 * @param {HTMLElement} element - The DOM element being animated
 */
const disable = element => {
  element.setAttribute('js-anim--disabled', 'true');
};

/**
 * Removes the attribute that indicates that an element is currently being animated
 * @param {HTMLElement} element
 */
const enable = element => {
  element.removeAttribute('js-anim--disabled');
};

/**
 * Verifies if an element is already being animated or not
 * @param {HTMLElement} element - The DOM element to check
 * @returns True if the element is not currently being animated
 */
const isEnabled = element =>
  !(element.getAttribute('js-anim--disabled') === 'true');

/**
 * Removes the CSS class which sets the overflow property to 'clip' (or 'hidden')
 * @param {HTMLElement} el - The DOM element with the CSS class to remove
 */
const removeOverflowHidden = el => {
  el.classList.remove(CLASS_NAMES.overflowHidden);
};

/**
 * Executes a given callback, checking, when necessary, if the callback was already
 * executed by another element being animated by the same trigger button
 * @param {string} trigger - The CSS selector of the element that triggered the animation
 * @param {Function} fn - The callback to execute
 * @param {string} type - Either 'start' or 'complete'
 */
const initCallback = (trigger, fn, type) => {
  if (!['start', 'complete'].includes(type))
    throw new ReferenceError(
      `Invalid callback type: ${type}. Should be 'start' or 'complete'`
    );
  if (trigger) {
    if (!(trigger in CALLBACK_TRACKER.executing))
      CALLBACK_TRACKER.init(trigger);
    if (!CALLBACK_TRACKER.executing[trigger][type]) {
      CALLBACK_TRACKER.executing[trigger][type] = true;
      fn();
    }
  } else {
    fn();
  }
};

const getAnimationHandler = async (animType, args) => {
  const { element, action, id } = args;
  let animationHandler = null;

  if (animType === 'motion') {
    const { default: MotionAnimationHandler } = await import(
      './MotionAnimationHandler.js'
    );
    animationHandler = new MotionAnimationHandler(element, action, id);
  } else if (animType === 'visibility') {
    const { widthTransition, heightTransition } = args;

    if (widthTransition || heightTransition) {
      const { default: VisibilityAnimationHandler } = await import(
        './VisibilityAnimationWithParentResizeHandler.js'
      );
      animationHandler = new VisibilityAnimationHandler(element, action, id);
      animationHandler.setDimensionsTransition({
        heightTransition,
        widthTransition,
      });
    } else {
      const { default: VisibilityAnimationHandler } = await import(
        './VisibilityAnimationHandler.js'
      );
      animationHandler = new VisibilityAnimationHandler(element, action, id);
    }

    if (args.overflowHidden) animationHandler.setOverflowHidden(true);
    if (args.maintainSpace) animationHandler.setMaintainSpace(true);
  }

  await animationHandler.initDependencies();
  return animationHandler;
};

/**
 * Handles all the animation process
 * @param {HTMLElement} element - The DOM element to animate
 * @param {string} action - 'show', 'hide', or 'move'
 * @param {number} id - ID of an animation in the *_ANIMS_ID objects
 * @param {Object.<string, any>} opts - All the options passed by the user
 * @see {@link module:globals.VISIBILITY_ANIMS_ID}
 * @see {@link module:globals.MOTION_ANIMS_ID}
 */
const animate = async (element, action, id, opts = {}) => {
  disable(element);
  const {
    animType,
    trigger,
    start = CONFIG.start,
    complete = CONFIG.complete,
    maintainSpace = CONFIG.maintainSpace,
    dimensionsTransition = maintainSpace || isMotion(animType)
      ? false
      : CONFIG.dimensionsTransition,
    widthTransition = CONFIG.widthTransition ?? dimensionsTransition,
    heightTransition = CONFIG.heightTransition ?? dimensionsTransition,
    overflowHidden = CONFIG.overflowHidden,
  } = opts;
  const { duration, delay } = getTotalAnimTime(element);
  const OPPOSITE_ACTION = Object.freeze({
    hide: 'show',
    show: 'hide',
    move: 'moveBack',
    moveBack: 'move',
  });

  if (trigger) TARGETS_STACK.add(element, trigger);

  const handleAnimation = await getAnimationHandler(animType, {
    element,
    action,
    id,
    widthTransition,
    heightTransition,
    overflowHidden,
    maintainSpace,
  });

  const concludeAnimation = () => {
    if (trigger && opts.queryIndex === opts.totalTargets - 1) {
      opts.staggerDelay
        ? CALLBACK_TRACKER.remove(trigger)
        : setTimeout(() => CALLBACK_TRACKER.remove(trigger), delay);
      TARGETS_STACK.get(trigger).forEach(el => enable(el));
      TARGETS_STACK.remove(trigger);
    } else if (!trigger) {
      enable(element);
    }
  };

  handleAnimation.begin();
  if (typeof start === 'function') {
    initCallback(trigger, start, 'start');
  }
  element.classList.add(CLASS_NAMES[action][id]);
  element.classList.remove(CLASS_NAMES[OPPOSITE_ACTION[action]][id]);
  handleAnimation.middle();

  setTimeout(async () => {
    handleAnimation.end();
    if (typeof complete === 'function') {
      initCallback(trigger, complete, 'complete');
    }
    concludeAnimation();
  }, duration + delay);
};

/**
 * Checks which animation CSS class is set to determine wich action to perform next
 * @param {HTMLElement} element - The DOM element being animated
 * @param {*} animType - Either 'motion' or 'visibility'
 * @returns 'show' or 'hide' or 'move' or 'moveBack'
 */
const getAction = (element, animType) => {
  const classList = [...element.classList];
  return isVisibility(animType)
    ? classList.find(
        c => c === CLASS_NAMES.collapsed || c === CLASS_NAMES.hidden
      )
      ? 'show'
      : 'hide'
    : isMotion(animType)
    ? classList.includes(CLASS_NAMES.moved)
      ? 'moveBack'
      : 'move'
    : null;
};

/**
 * Sets the CSS properties customized by the user,
 * prior to the begining of the animation
 * @param {HTMLElement} el - The DOM element being animated
 * @param {Object} args - The animation's ID and type and all the options passed by the user
 */
const preset = async (el, args) => {
  const { opts, animationId } = args;
  const { animType } = opts;
  if (
    !isMotion(animType) ||
    ![MOTION_ANIMS_ID.rotate, MOTION_ANIMS_ID.rotationLoop].includes(
      animationId
    )
  )
    opts.angle = undefined;

  await updateCssProperties(el, opts);

  if (opts.staggerDelay) {
    const staggeredDelay =
      getTimeInMs(opts.delay) +
      getTimeInMs(opts.staggerDelay) * opts.queryIndex;
    setCssProperty(el, 'delay', `${staggeredDelay}ms`);
  }
};

/**
 * Generates the handler function to be passed to the event listener
 * @param {HTMLElement} el - The DOM element being animated
 * @param {number} animationId - The ID of the animation in the *_ANIMS_ID
 * @param {Object} opts - The options passed by the user
 * @returns {EventListener} A function to be passed to the addEventListener() as a handler
 * @see {@link module:globals.VISIBILITY_ANIMS_ID}
 * @see {@link module:globals.MOTION_ANIMS_ID}
 */
const eventHandler = (el, animationId, opts) => {
  return async (/** @type {Event} */ e) => {
    const {
      stopPropagation = CONFIG.stopPropagation,
      preventDefault = CONFIG.preventDefault,
    } = opts;
    if (stopPropagation) e.stopPropagation();
    if (preventDefault) e.preventDefault();

    const action = getAction(el, opts.animType);
    if (!action)
      throw new ReferenceError(
        `Can't find a valid action for this animation type`
      );

    await preset(el, {
      animationId,
      opts,
    });

    if (isEnabled(el)) animate(el, action, animationId, opts);
  };
};

/**
 * Initiate the event listener with the animation
 * @param {number} animationId - The ID of the animation in *_ANIMS_ID object
 * @param {Object} opts - All options passed by the user
 * @see {@link module:globals.VISIBILITY_ANIMS_ID}
 * @see {@link module:globals.MOTION_ANIMS_ID}
 */
const init = (animationId, opts = {}) => {
  const {
    on: eventType = CONFIG.on,
    trigger = CONFIG.trigger,
    targetSelector = CONFIG.targetSelector,
    cursor,
  } = opts;

  /** TODO: load dependencies on page load */
  // async function loadDependencies() {
  //   await import('./resize-parent.js');
  //   await import('./measurements.js');
  //   await import('./transitions.js');

  //   removeEventListener('load', loadDependencies);
  // }

  // addEventListener('load', loadDependencies);

  document.querySelectorAll(trigger).forEach(btn => {
    btn.classList.add(CLASS_NAMES.btnCursor);
    if (typeof cursor === 'string') {
      setCssProperty(btn, 'cursor', cursor);
    }
    if (typeof targetSelector === 'string') {
      btn.setAttribute('target-selector', targetSelector);
    }

    if (!opts.trigger) opts.trigger = trigger;
    LISTENERS[trigger] = [];
    document
      .querySelectorAll(getTargetSelector(btn))
      .forEach((el, i, queryList) => {
        // @ts-ignore
        const listener = eventHandler(el, animationId, {
          ...opts,
          totalTargets: queryList.length,
          queryIndex: i,
        });

        LISTENERS[trigger].push(listener);
        btn.addEventListener(eventType, listener);
      });
  });
};

/**
 * Removes the event listener of all elements represented by the `triggerSelector`
 * @param {String|null} triggerSelector - A valid CSS selector for the trigger Element. If ommited, '.${CLASS_NAMES.trigger}' will be used instead.
 * @param {String} eventType - The event name. If ommited, 'click' is the default value.
 */
const end = (triggerSelector = null, eventType = 'click') => {
  const triggerList =
    typeof triggerSelector === 'string'
      ? document.querySelectorAll(triggerSelector)
      : document.querySelectorAll(`.${CLASS_NAMES.trigger}`);

  triggerList.forEach(trigger => {
    LISTENERS[triggerSelector ?? `.${CLASS_NAMES.trigger}`].forEach(
      listener => {
        trigger.removeEventListener(eventType, listener);
      }
    );
  });
  delete LISTENERS[triggerSelector ?? `.${CLASS_NAMES.trigger}`];
};

export {
  init,
  end,
  animate,
  preset,
  isEnabled,
  updateCssProperties,
  updateDefaultConfig,
  resetDefaultConfig,
};

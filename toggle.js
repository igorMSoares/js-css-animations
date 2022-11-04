const validateDimension = dimension => {
  if (dimension !== 'height' && dimension !== 'width') {
    throw new ReferenceError(
      `Invalid dimension: ${dimension}. Use 'height' or 'width'`
    );
  }
};

const getMarginNumericValue = margin => {
  return +margin.match(/[\d.]+/);
};

const getVertMargin = (margins, arrLength) => {
  let marginSize = 0;
  if ((arrLength === 1 || arrLength === 2) && margins[0] !== '0px') {
    marginSize = 2 * getMarginNumericValue(margins[0]);
  } else if (arrLength === 3 || arrLength === 4) {
    marginSize = getMarginNumericValue(margins[0]);
    marginSize += getMarginNumericValue(margins[2]);
  }

  return marginSize;
};

const getHorizMargin = (margins, arrLength) => {
  let marginSize = 0;
  if (arrLength === 2 || arrLength === 3) {
    marginSize = 2 * getMarginNumericValue(margins[1]);
  } else if (arrLength === 4) {
    marginSize = getMarginNumericValue(margins[1]);
    marginSize += getMarginNumericValue(margins[3]);
  }

  return marginSize;
};

const getElementMargins = (element, axis) => {
  const calcMargins = {
    horizontal: getHorizMargin,
    vertical: getVertMargin,
  };

  const margins = getComputedStyle(element).margin.split(' ');
  const arrLength = margins.length;

  return calcMargins[axis](margins, arrLength);
};

const getElementMeasure = (element, dimension) => {
  validateDimension(dimension);

  element.style.setProperty(
    'display',
    getComputedStyle(element).display === 'none' ? 'block' : ''
  );

  const measure =
    dimension === 'height' ? element.offsetHeight : element.offsetWidth;

  element.style.removeProperty('display');

  return (
    measure +
    getElementMargins(
      element,
      dimension === 'height' ? 'vertical' : 'horizontal'
    )
  );
};

const getParentMeasure = (elem, dimension) => {
  validateDimension(dimension);

  const measure = {};
  const parent = elem.parentElement;

  /** parent measurement before setting child to display: none */
  measure.before =
    dimension === 'height' ? parent.offsetHeight : parent.offsetWidth;
  if (getComputedStyle(elem).display === 'none') {
    measure.before += getElementMeasure(elem, dimension);
  }

  elem.style.setProperty('display', 'none');
  /** parent measurement after setting child to display: none */
  measure.after =
    dimension === 'height' ? parent.offsetHeight : parent.offsetWidth;
  elem.style.removeProperty('display');

  return measure;
};

const getParentMeasures = elem => {
  return {
    height: getParentMeasure(elem, 'height'),
    width: getParentMeasure(elem, 'width'),
  };
};

const setDimensionMax = (elem, dimension, value) =>
  elem.style.setProperty(`max-${dimension}`, value);

const removeDimensionMax = (elem, dimension) =>
  elem.style.removeProperty(`max-${dimension}`);

const getToggleSelector = eventTarget => {
  let toggleBtn = eventTarget;
  while (!toggleBtn.getAttribute('toggle-selector')) {
    /** bubbles up untill the attribute is found */
    toggleBtn = toggleBtn.parentElement;
  }

  return toggleBtn.getAttribute('toggle-selector');
};

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

const measured = {
  hide: { initial: 'before', final: 'after' },
  show: { initial: 'after', final: 'before' },
};

const setParentMaxMeasures = args => {
  const { parentState = 'initial', element, parentMeasures, action } = args;
  setDimensionMax(
    element.parentElement,
    'height',
    `${parentMeasures.height[measured[action][parentState]]}px`
  );
  setDimensionMax(
    element.parentElement,
    'width',
    `${parentMeasures.width[measured[action][parentState]]}px`
  );
};

const getRootProperty = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    propertyNames[property]
  );
};

const getCustomProperties = () => ['duration', 'timingFunction'];

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

const animate = (element, action, id) => {
  element.setAttribute('disabled', 'true');
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
  }, duration);
};

const eventHandler = (triggerBtn, id) => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = classList.find(c => c === classNames.collapsed)
      ? 'show'
      : 'hide';

    if (!element.getAttribute('disabled')) animate(element, action, id);
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

const init = (animationId, opts = {}) => {
  const {
    toggleBtn = `.${classNames.toggleBtn}`,
    cursor,
    widthTransition = true,
    heightTransition = true,
  } = opts;

  document.querySelectorAll(toggleBtn).forEach(btn => {
    btn.classList.add(classNames.btnCursor);
    if (cursor && typeof cursor === 'string') {
      setCssProperty(btn, 'cursor', cursor);
    }
    btn.addEventListener('click', e => eventHandler(e.target, animationId));

    document.querySelectorAll(getToggleSelector(btn)).forEach(el => {
      updateCssProperties(el, opts);

      setDimensionsTransitions(
        el.parentElement,
        widthTransition,
        heightTransition
      );
    });
  });
};

const initAnimations = (type, opts) => {
  init(animationsId[type], opts);
};

export default initAnimations;

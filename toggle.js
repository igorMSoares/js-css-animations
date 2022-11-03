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

const setMaxHeight = (elem, height) =>
  elem.style.setProperty('max-height', height);

const setMaxWidth = (elem, width) => elem.style.setProperty('max-width', width);

const removeMaxHeight = elem => elem.style.removeProperty('max-height');

const removeMaxWidth = elem => elem.style.removeProperty('max-width');

const getToggleSelector = eventTarget => {
  let toggleBtn = eventTarget;
  while (!toggleBtn.getAttribute('toggle-selector')) {
    /** bubbles up untill the attribute is found */
    toggleBtn = toggleBtn.parentElement;
  }

  return toggleBtn.getAttribute('toggle-selector');
};

const classNames = {
  dimensionsTransitions: 'js-anim--dimensions-transitions',
  heightTransition: 'js-anim--height-transition',
  widthTransition: 'js-anim--width-transition',
  toggleBtn: 'js-anim--toggle-btn',
  btnCursor: 'js-anim--btn-cursor',
  collapsed: 'js-anim--collapsed',
  collapse: 'js-anim--collapse',
  expand: 'js-anim--expand',
};

const measured = {
  collapse: { initial: 'before', final: 'after' },
  expand: { initial: 'after', final: 'before' },
};

const setParentMaxMeasures = args => {
  const { parentState = 'initial', element, parentMeasures, action } = args;
  setMaxHeight(
    element.parentElement,
    `${parentMeasures.height[measured[action][parentState]]}px`
  );
  setMaxWidth(
    element.parentElement,
    `${parentMeasures.width[measured[action][parentState]]}px`
  );
};

const getRootProperty = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    getCssPropertyName(property)
  );
};

const setParentCssProperties = element => {
  const duration = getComputedStyle(element).getPropertyValue(
    '--js-css-animation--duration'
  );
  const timingFunction = getComputedStyle(element).getPropertyValue(
    '--js-css-animation--timing-function'
  );

  if (duration !== getRootProperty('duration')) {
    element.parentElement.style.setProperty(
      getCssPropertyName('duration'),
      duration
    );
  }

  if (timingFunction !== getRootProperty('timing-function')) {
    element.parentElement.style.setProperty(
      getCssPropertyName('timing-function'),
      timingFunction
    );
  }
};

const removeParentCssProperties = element => {
  element.parentElement.style.removeProperty(getCssPropertyName('duration'));
  element.parentElement.style.removeProperty(
    getCssPropertyName('timing-function')
  );
};

const expandCollapse = (element, action) => {
  element.setAttribute('disabled', 'true');
  const duration = Number(
    getComputedStyle(element)
      .getPropertyValue(getCssPropertyName('duration'))
      .match(/\d+/)
  );

  setParentCssProperties(element);

  const oppositeAction = {
    collapse: 'expand',
    expand: 'collapse',
  };
  const parentMeasures = getParentMeasures(element);

  setParentMaxMeasures({ element, parentMeasures, action });
  element.classList.add(classNames[action]);
  element.classList.remove(classNames[oppositeAction[action]]);

  setTimeout(() => {
    setParentMaxMeasures({
      parentState: 'final',
      element,
      parentMeasures,
      action,
    });
    if (action === 'expand') {
      element.classList.remove(classNames.collapsed);
    }
  }, 0);

  setTimeout(() => {
    if (action === 'collapse') {
      element.classList.add(classNames.collapsed);
    }
    removeMaxHeight(element.parentElement);
    removeMaxWidth(element.parentElement);
    setTimeout(() => element.removeAttribute('disabled'), 100);
    removeParentCssProperties(element);
  }, duration);
};

const expandCollapseHandler = triggerBtn => {
  document.querySelectorAll(getToggleSelector(triggerBtn)).forEach(element => {
    const classList = [...element.classList];
    const action = classList.find(c => c === classNames.collapsed)
      ? 'expand'
      : 'collapse';

    if (!element.getAttribute('disabled')) expandCollapse(element, action);
  });
};

const getCssPropertyName = property => {
  const propertyName = {
    duration: '--js-css-animation--duration',
    'timing-function': '--js-css-animation--timing-function',
    cursor: '--js-css-animation--cursor',
  };

  return propertyName[property];
};

const setCssProperty = (element, property, value) => {
  element.style.setProperty(getCssPropertyName(property), value);
};

const updateCssProperties = (element, opts) => {
  const { duration, timingFunction } = opts;

  if (duration && typeof duration === 'string') {
    setCssProperty(element, 'duration', duration);
  }

  if (timingFunction && typeof timingFunction === 'string') {
    setCssProperty(element, 'timing-function', timingFunction);
  }
};

const setParentTransitions = (element, wTransit, hTransit) => {
  if (wTransit && hTransit)
    element.parentElement.classList.add(classNames.dimensionsTransitions);
  else if (wTransit)
    element.parentElement.classList.add(classNames.widthTransition);
  else if (hTransit)
    element.parentElement.classList.add(classNames.heightTransition);
};

const initExpandCollapse = (opts = {}) => {
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
    btn.addEventListener('click', e => expandCollapseHandler(e.target));

    document.querySelectorAll(getToggleSelector(btn)).forEach(el => {
      updateCssProperties(el, opts);

      setParentTransitions(el, widthTransition, heightTransition);
    });
  });
};

const initAnimations = (type, opts) => {
  const starter = {
    'expand-collapse': initExpandCollapse,
  };

  starter[type](opts);
};

export default initAnimations;

import {
  CLASS_NAMES,
  CUSTOM_CSS_PROPERTIES,
  PROPERTY_NAMES,
} from './globals.js';

import {
  getParentMeasures,
  setParentMaxMeasures,
  removeDimensionMax,
} from './measurements.js';

import {
  setCssProperty,
  removeCustomCssProperties,
} from './js-css-animations.js';

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

const getDimension = (wTransit, hTransit) => {
  let dimension;
  if (wTransit && hTransit) dimension = 'all';
  else if (wTransit) dimension = 'width';
  else if (hTransit) dimension = 'height';
  return dimension;
};

const initParentTransitions = args => {
  const { element, action, widthTransition, heightTransition } = args;
  const parentMeasures = getParentMeasures(element);
  const dimension = getDimension(widthTransition, heightTransition);
  setParentCssProperties(element);
  setParentMaxMeasures({
    element,
    parentMeasures,
    action,
    dimension,
  });
  return { parentMeasures, dimension };
};

const handleVisibilityToggle = (element, args) => {
  setParentMaxMeasures(args);
  if (args.action === 'show') {
    args.hide
      ? element.classList.remove(CLASS_NAMES.hidden)
      : element.classList.remove(CLASS_NAMES.collapsed);
  }
};

const endVisibilityToggle = (element, action, hide) => {
  if (action === 'hide') {
    hide
      ? element.classList.add(CLASS_NAMES.hidden)
      : element.classList.add(CLASS_NAMES.collapsed);
  }
  removeDimensionMax(element.parentElement, 'height');
  removeDimensionMax(element.parentElement, 'width');
  removeCustomCssProperties(element.parentElement);
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

export {
  initParentTransitions,
  handleVisibilityToggle,
  endVisibilityToggle,
  setDimensionsTransitions,
};

const getParentHeight = elem => {
  const height = {};
  const parent = elem.parentElement;
  if (getComputedStyle(elem).display === 'none') {
    height.before = parent.offsetHeight + getElementHeight(elem);
  } else {
    height.before = parent.offsetHeight;
  }
  elem.style.setProperty('display', 'none');
  height.after = parent.offsetHeight;
  elem.style.removeProperty('display');

  return height;
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

const getElementHeight = element => {
  element.style.setProperty(
    'display',
    getComputedStyle(element).display === 'none' ? 'block' : ''
  );
  const height = element.offsetHeight;
  element.style.removeProperty('display');

  return height + getElementMargins(element, 'vertical');
};

const setMaxHeight = (elem, height) => {
  elem.style.setProperty('max-height', height);
};

const removeMaxHeight = elem => elem.style.removeProperty('max-height');

const getToggleElement = eventTarget => {
  let toggleBtn = eventTarget;
  while (!toggleBtn.getAttribute('toggle-element')) {
    /** bubbles up untill the attribute is found */
    toggleBtn = toggleBtn.parentElement;
  }

  return toggleBtn.getAttribute('toggle-element');
};

const classNames = {
  collapsed: 'js-anim--collapsed',
  collapse: 'js-anim--collapse',
  expand: 'js-anim--expand',
};

const parentMxHgt = {
  collapse: { initial: 'before', final: 'after' },
  expand: { initial: 'after', final: 'before' },
};

const oppositeAction = {
  collapse: 'expand',
  expand: 'collapse',
};

const setParentMaxHeight = args => {
  const { parentState = 'initial', element, parentHeight, action } = args;
  setMaxHeight(
    element.parentElement,
    `${parentHeight[parentMxHgt[action][parentState]]}px`
  );
};

const expandCollapse = (element, action, duration) => {
  const parentHeight = getParentHeight(element);

  setParentMaxHeight({ element, parentHeight, action });
  element.classList.add(classNames[action]);
  element.classList.remove(classNames[oppositeAction[action]]);

  setTimeout(() => {
    setParentMaxHeight({ parentState: 'final', element, parentHeight, action });
    if (action === 'expand') {
      element.classList.remove(classNames.collapsed);
    }
  }, duration.toggleHeight[action]);

  setTimeout(() => {
    if (action === 'collapse') {
      element.classList.add(classNames.collapsed);
    }
    removeMaxHeight(element.parentElement);
  }, duration.total[action]);
};

const expandCollapseHandler = (triggerBtn, duration) => {
  document
    .querySelectorAll(`.${getToggleElement(triggerBtn)}`)
    .forEach(element => {
      const classList = [...element.classList];
      const action = classList.find(c => c === classNames.collapsed)
        ? 'expand'
        : 'collapse';

      expandCollapse(element, action, duration);
    });
};

const initExpandCollapse = (opts = {}) => {
  const {
    toggleBtn = '.js-anim--toggle-btn',
    duration = {
      toggleHeight: { expand: 0, collapse: 0 },
      total: { expand: 500, collapse: 500 },
    },
  } = opts;
  console.log(duration);
  document.querySelectorAll(toggleBtn).forEach(btn => {
    btn.addEventListener('click', e =>
      expandCollapseHandler(e.target, duration)
    );

    document
      .querySelectorAll(`.${getToggleElement(btn)}`)
      .forEach(el =>
        el.parentElement.classList.add('js-anim--mxhgt-transition')
      );
  });
};

const initAnimations = (type, opts) => {
  const starter = {
    'expand-collapse': initExpandCollapse,
  };

  starter[type](opts);
};

export default initAnimations;

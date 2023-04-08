import { CLASS_NAMES, PROPERTY_NAMES } from './globals.js';
import AnimationHandler from './AnimationHandler.js';

export default class VisibilityAnimationHandler extends AnimationHandler {
  constructor(element, action, animationId) {
    super(element, action, animationId);
    this.overflowHidden = null;
    this.maintainSpace = null;
  }

  setOverflowHidden(overflowHidden) {
    this.overflowHidden = overflowHidden;
  }

  setMaintainSpace(maintainSpace) {
    this.maintainSpace = maintainSpace;
  }

  static #applyOverflowHidden(element) {
    element.classList.add(CLASS_NAMES.overflowHidden);
  }

  static #removeOverflowHidden(element) {
    element.classList.remove(CLASS_NAMES.overflowHidden);
  }

  static #hasIterationProp(element) {
    const iterationProperty = element.style.getPropertyValue(
      PROPERTY_NAMES.iteration
    );

    return (
      iterationProperty != '1' &&
      iterationProperty.match(/^(infinite|\d+)$/) !== null
    );
  }

  begin() {
    if (this.overflowHidden && this.element.parentElement)
      VisibilityAnimationHandler.#applyOverflowHidden(
        this.element.parentElement
      );
  }

  middle() {
    setTimeout(() => {
      if (this.action === 'show') {
        this.element.classList.remove(
          CLASS_NAMES.hidden,
          CLASS_NAMES.collapsed
        );
      }
    }, 0);
  }

  end() {
    if (this.action === 'hide') {
      this.maintainSpace
        ? this.element.classList.add(CLASS_NAMES.hidden)
        : this.element.classList.add(CLASS_NAMES.collapsed);
    }

    if (this.overflowHidden && this.element.parentElement)
      VisibilityAnimationHandler.#removeOverflowHidden(
        this.element.parentElement
      );

    if (!VisibilityAnimationHandler.#hasIterationProp(this.element))
      this.element.classList.remove(CLASS_NAMES[this.action][this.animationId]);
  }
}

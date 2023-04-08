import { MOTION_ANIMS_ID, PROPERTY_NAMES, CLASS_NAMES } from './globals.js';
import AnimationHandler from './AnimationHandler.js';

export default class MotionAnimationHandler extends AnimationHandler {
  constructor(element, action, animationId) {
    super(element, action, animationId);
    this.currentTransition = null;
  }

  static #transitionsModule = null;

  static #removeMotionCssClass(element) {
    const className = [...element.classList].find(cl =>
      cl.match(/js\-anim\-\-(rotate|scale)/)
    );

    if (className) element.classList.remove(className);
    if (className === CLASS_NAMES.move[MOTION_ANIMS_ID.rotate]) {
      element.style.removeProperty(PROPERTY_NAMES.angle);
    }
  }

  static async #initTransitionsModule() {
    if (!this.#transitionsModule) {
      this.#transitionsModule = await AnimationHandler.getModule(
        './transitions.js'
      );
    }
  }

  async begin() {
    await MotionAnimationHandler.#initTransitionsModule();
    this.currentTransition =
      MotionAnimationHandler.#transitionsModule.getCurrentTransition(
        this.element
      );
    MotionAnimationHandler.#removeMotionCssClass(this.element);
  }

  async middle() {
    await MotionAnimationHandler.#initTransitionsModule();
    if (this.currentTransition) {
      MotionAnimationHandler.#transitionsModule.appendTransition(
        this.element,
        CLASS_NAMES[this.action][this.animationId],
        this.currentTransition
      );
    }
    if (this.action === 'move') this.element.classList.add(CLASS_NAMES.moved);
  }

  end() {
    if (this.action === 'moveBack')
      this.element.classList.remove(CLASS_NAMES.moved);
  }
}

import VisibilityAnimationHandler from './VisibilityAnimationHandler.js';

export default class VisibilityAnimationWithParentResizeHandler extends VisibilityAnimationHandler {
  constructor(element, action, animationId) {
    super(element, action, animationId);
    this.heightTransition = null;
    this.widthTransition = null;
    this.dimension = null;
    this.parentMeasures = null;
  }

  setDimensionsTransition(heightTransition, widthTransition) {
    this.heightTransition = heightTransition;
    this.widthTransition = widthTransition;
  }

  static #resizeParentModule = null;
  static #measurementsModule = null;

  static async #initResizeParentModule() {
    if (!VisibilityAnimationWithParentResizeHandler.#resizeParentModule) {
      VisibilityAnimationWithParentResizeHandler.#resizeParentModule =
        await this.getModule('./resize-parent.js');
    }
  }

  static async #initMeasurementsModule() {
    if (!VisibilityAnimationWithParentResizeHandler.#measurementsModule) {
      VisibilityAnimationWithParentResizeHandler.#measurementsModule =
        await this.getModule('./measurements.js');
    }
  }

  async begin() {
    await VisibilityAnimationWithParentResizeHandler.#initResizeParentModule();
    super.begin();

    if (this.widthTransition || this.heightTransition) {
      const parentData =
        VisibilityAnimationWithParentResizeHandler.#resizeParentModule.initParentResize(
          {
            element: this.element,
            action: this.action,
            widthTransition: this.widthTransition,
            heightTransition: this.heightTransition,
          }
        );

      this.parentMeasures = parentData.parentMeasures;
      this.dimension = parentData.dimension;
    }
  }

  async middle() {
    await VisibilityAnimationWithParentResizeHandler.#initMeasurementsModule();
    super.middle();

    setTimeout(() => {
      if (this.dimension)
        VisibilityAnimationWithParentResizeHandler.#measurementsModule.setParentMaxMeasures(
          {
            parentState: 'final',
            element: this.element,
            parentMeasures: this.parentMeasures,
            action: this.action,
            dimension: this.dimension,
          }
        );
    }, 0);
  }

  async end() {
    await VisibilityAnimationWithParentResizeHandler.#initResizeParentModule();
    super.end();

    const { widthTransition, heightTransition } = this;
    if (widthTransition || heightTransition) {
      VisibilityAnimationWithParentResizeHandler.#resizeParentModule.endParentResize(
        this.element,
        { widthTransition, heightTransition }
      );
    }
  }
}

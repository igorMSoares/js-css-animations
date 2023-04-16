import AnimationHandler from './AnimationHandler.js';
import VisibilityAnimationHandler from './VisibilityAnimationHandler.js';

export default class VisibilityAnimationWithParentResizeHandler extends VisibilityAnimationHandler {
  constructor(element, action, animationId) {
    super(element, action, animationId);
    this.heightTransition = null;
    this.widthTransition = null;
    this.dimension = null;
    this.parentMeasures = null;
  }

  setDimensionsTransition({ heightTransition, widthTransition }) {
    this.heightTransition = heightTransition;
    this.widthTransition = widthTransition;
  }

  async initDependencies() {
    await AnimationHandler.getModule('./resize-parent.js');
    await AnimationHandler.getModule('./measurements.js');
  }

  begin() {
    super.begin();

    if (this.widthTransition || this.heightTransition) {
      const { initParentResize } = AnimationHandler.modules.resizeParent;

      const parentData = initParentResize({
        element: this.element,
        action: this.action,
        widthTransition: this.widthTransition,
        heightTransition: this.heightTransition,
      });

      this.parentMeasures = parentData.parentMeasures;
      this.dimension = parentData.dimension;
    }
  }

  middle() {
    super.middle();

    setTimeout(() => {
      if (this.dimension) {
        const { setParentMaxMeasures } = AnimationHandler.modules.measurements;

        setParentMaxMeasures({
          parentState: 'final',
          element: this.element,
          parentMeasures: this.parentMeasures,
          action: this.action,
          dimension: this.dimension,
        });
      }
    }, 0);
  }

  end() {
    super.end();

    const { widthTransition, heightTransition } = this;
    if (widthTransition || heightTransition) {
      const { endParentResize } = AnimationHandler.modules.resizeParent;
      endParentResize(this.element, { widthTransition, heightTransition });
    }
  }
}

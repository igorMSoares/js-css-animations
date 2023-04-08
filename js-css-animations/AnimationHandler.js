export default class AnimationHandler {
  constructor(element, action, animationId) {
    this.element = element;
    this.action = action;
    this.animationId = animationId;
  }

  static modules = {};

  static async getModule(modulePath) {
    if (!(modulePath in this.modules)) {
      const module = await import(modulePath);
      this.modules[modulePath] = module;
    }

    return this.modules[modulePath];
  }

  begin() {
    throw new TypeError("Method 'begin' is not implemented.");
  }

  middle() {
    throw new TypeError("Method 'middle' is not implemented.");
  }

  end() {
    throw new Error("Method 'end' is not implemented.");
  }
}

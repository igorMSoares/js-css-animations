export default class AnimationHandler {
  constructor(element, action, animationId) {
    this.element = element;
    this.action = action;
    this.animationId = animationId;
  }

  static modules = {};

  static async getModule(modulePath) {
    if (!(modulePath in this.modules)) {
      const toCamelCase = path => {
        const fileName = path.match(/\/([^\.]+)(?:\.js)?$/)[1];
        return fileName.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
      };
      const module = await import(modulePath);
      this.modules[toCamelCase(modulePath)] = module;
    }

    return this.modules[modulePath];
  }

  async initDependencies() {
    return Promise.resolve();
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

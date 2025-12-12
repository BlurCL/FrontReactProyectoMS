module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
  "spec/support/carritoUtils.js",
  "spec/support/carritoUtils.spec.js"],
    reporters: ["progress"],
    browsers: ["ChromeHeadless"], 
    singleRun: false,
    autoWatch: true
  });
};

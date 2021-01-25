module.exports = {
  plugins: ["@theorem", "prettier"],
  extends: ["plugin:@theorem/opinionated", "prettier"],
  env: {
    browser: true,
    node: true,
  },
}

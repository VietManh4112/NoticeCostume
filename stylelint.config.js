module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "color-function-notation": null,
    "length-zero-no-unit": null,
    "rule-empty-line-before": null,
    "keyframes-name-pattern": null,
    "selector-class-pattern": null,
    "font-family-name-quotes": null,
    "media-feature-range-notation": "prefix"
  },
}

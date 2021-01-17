module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/vue",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "vue/html-indent": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/require-default-prop": "off",
  },
};

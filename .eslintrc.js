const { getESLintConfig } = require("@x.render/render-lint");
module.exports = getESLintConfig("common-ts", {
  rules: {
    "no-useless-catch": "off",
    "no-console": "off",
    "@typescript-eslint/no-require-imports": "off",
    eqeqeq: "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": "off",
    "max-len": "off",
  },
});

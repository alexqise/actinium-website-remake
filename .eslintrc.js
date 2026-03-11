module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off",
  },
};

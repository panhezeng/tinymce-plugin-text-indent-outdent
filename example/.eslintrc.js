module.exports = {
  root: true,
  env: {
    browser: true
  },
  plugins: ["prettier"],
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "prettier/prettier": "error"
  },
  parser: "babel-eslint",
  parserOptions: {},
  globals: {
    tinymce: "readonly"
  }
};

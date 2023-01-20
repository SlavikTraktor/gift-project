module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    semi: ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "comma",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
        multilineDetection: "brackets",
        overrides: {
          interface: {
            multiline: {
              delimiter: "semi",
              requireLast: true,
            },
          },
        },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "@typescript-eslint/array-type": ["off"],
    "@typescript-eslint/space-before-function-paren": ["off"],
    "@typescript-eslint/no-floating-promises": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "promise/param-names": ["off"],
    "react/prop-types": ["off"],
  },
};

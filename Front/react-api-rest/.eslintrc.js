module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': 2,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 0,
    'default-param-last': 0,
    'react/jsx-no-bind': 0,
    'react/react-in-jsx-scope': 'off',
    'no-unused-expressions': 0,
    'react/jsx-no-useless-fragment': 'off',
    // 'no-unused-vars': 'off',
    'jsx-a11y/label-has-associated-control': 0,
    'consistent-return': 'off',
    'no-plusplus': 0,
  },
};

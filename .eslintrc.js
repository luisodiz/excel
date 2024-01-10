module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': ['eslint:recommended'],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'linebreak-style': 0,
    'eol-last': 0,
    'max-len': 0,
    'no-debugger': 0,
  },
};

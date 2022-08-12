module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    '@antfu',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  rules: {
    // TODO:改完把这个规则去掉
    'vue/component-tags-order': [
      'error',
      {
        order: [['template', 'script'], 'style']
      }
    ],

    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        arrowParens: 'avoid'
      }
    ],
    eqeqeq: ['error', 'always'],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+']
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true
        }
      }
    ]
  }
}

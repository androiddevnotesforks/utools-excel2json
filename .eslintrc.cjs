module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@antfu', 'plugin:prettier/recommended', './.eslintrc-auto-import.json'],
  rules: {
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
        arrowParens: 'avoid',
        printWidth: 90
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

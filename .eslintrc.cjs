/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true, // 浏览器环境
    node: true, // Node环境
    es2021: true // 启用除了modules以外的所有 ECMAScript 6 特性
  },
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    './.eslintrc-auto-import.json', // 引入自动化import配置
    'plugin:vue/vue3-essential', //ESLint Vue3 插件扩展
    'eslint:recommended', //ESLint 官方扩展
    '@vue/eslint-config-prettier/skip-formatting' //Prettier NPM 扩展
  ],
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['warn', 'never'], // 禁止尾部使用分号
    'no-debugger': 'warn', // 禁止出现debugger
    // Allow @ts-ignore comment
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': 1,
    // Vue: Recommended rules to be closed or modify
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    // Vue: Add extra rules
    'vue/custom-event-name-casing': [2, 'camelCase'],
    'vue/no-v-text': 1,
    'vue/padding-line-between-blocks': 1,
    'vue/require-direct-export': 1,
    'vue/multi-word-component-names': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-param-reassign': 0,
    'prefer-regex-literals': 0,
    'import/no-extraneous-dependencies': 0
  }
}

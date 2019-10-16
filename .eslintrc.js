module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': 'error',
    "no-trailing-spaces": ["error", { "ignoreComments": true }],  // 禁用行尾空格
    "comma-spacing": ["error", { "before": false, "after": true }],  // 逗号前无空格，后要有空格
    "space-infix-ops": "error",  // 要求操作符周围有空格 
  }
}
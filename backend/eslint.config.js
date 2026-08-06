module.exports = [
  {
    ignores: ['dist', 'node_modules', 'src/**/*.ts', 'test/**/*.ts'],
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
];

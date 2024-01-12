module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new features
        'fix', // fix bugs
        'docs', // Documentation comments
        'style', // code format
        'refactor', // refactor
        'perf', // performance optimization
        'test', // increase test
        'chore', // Changes to the build process or accessibility tools
        'revert', // go back
        'build' // Pack
      ]
    ],
    'subject-case': [0]
  }
};

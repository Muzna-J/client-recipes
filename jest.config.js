module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      'node_modules/(?!axios)'
    ],
    setupFilesAfterEnv: [
      '<rootDir>/src/setupTests.ts'
    ],
    testPathIgnorePatterns: [
      '/node_modules/'
    ],
    coveragePathIgnorePatterns: [
      '/node_modules/'
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    },
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ]
  };
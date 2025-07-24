export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  globals: {
    'babel-jest': {
      useESM: true
    }
  }
};

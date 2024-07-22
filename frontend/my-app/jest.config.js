module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['<rootDir>/src/app/setupTests.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
  };
  
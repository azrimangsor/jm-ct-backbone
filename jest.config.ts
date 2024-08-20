module.exports = {
    preset: 'jest-playwright-preset',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
  };
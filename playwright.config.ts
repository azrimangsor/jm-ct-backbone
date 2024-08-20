import { defineConfig, devices } from '@playwright/test';
import { AllureReporter } from 'allure-playwright';

// Load environment variables from file.
import './loadEnv';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['./custom-reporter.ts'],
    ['allure-playwright']
  ],
  use: {
    trace: 'on-first-retry',
    actionTimeout: 10 * 1000,
    navigationTimeout: 60 * 1000,
  },
  projects: [
    {
      name: 'ct-dcf-ft',
      testDir: './tests/ft-data-capture',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'},
    },
    {
      name: 'ct-dcf-lch',
      testDir: './tests/lch-data-capture',
      use: {...devices['Desktop Edge'],
        channel: 'msedge'},
    },
    {
      name: 'ct-gitf-efuels',
      testDir: './tests/efuels-get-in-touch',
      use: {...devices['Desktop Edge'],
        channel: 'msedge'},
    },
    {
      name: 'ct-gitf-lch-estimator',
      testDir: './tests/lch-get-in-touch',
      use: {...devices['Desktop Edge'],
        channel: 'msedge'},
    },
  ]
  // Run your local dev server before starting the tests.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

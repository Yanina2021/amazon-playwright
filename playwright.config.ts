import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
//import path from 'path';
//process.env.CI ? dotenv.config() : dotenv.config({ path: path.resolve(__dirname, 'env/.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */

export const testConfig = {
  BASE_URL: process.env.BASE_URL ?? 'https://www.amazon.com',
  PRODUCT_SEARCH: process.env.PRODUCT_SEARCH ?? 'zapatos',
  BRAND_FILTER: process.env.BRAND_FILTER ?? 'skechers',
  HIGH_PRICE_OPTION: process.env.HIGH_PRICE_OPTION ?? 'price-desc-rank',
  HIGH_PRICE_COMMENT: process.env.HIGH_PRICE_COMMENT ?? 'Top 5 por precio más alto',
  NEW_RELEASES_OPTION: process.env.NEW_RELEASES_OPTION ?? 'date-desc-rank',
  NEW_RELEASES_COMMENT: process.env.NEW_RELEASES_COMMENT ?? 'Top 5 por nuevos lanzamientos',
  REVIEW_RANK_OPTION: process.env.REVIEW_RANK_OPTION ?? 'review-rank',
  REVIEW_RANK_COMMENT: process.env.REVIEW_RANK_COMMENT ?? 'Top 5 por promedio de comentarios',
};

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { host: '0.0.0.0', open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],
  use: {
    baseURL: testConfig.BASE_URL,
    headless: true,
    launchOptions: {
      slowMo: 500,
    },
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    //{
    // name: 'firefox',
    // use: { ...devices['Desktop Firefox'] },
    //},

    //{
    //  name: 'webkit',
    //  use: { ...devices['Desktop Safari'] },
    //},

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const fixtureUrl = `file://${path.resolve(__dirname, 'test-fixtures/autocomplete-form.html')}`;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    ...devices['Desktop Chrome'],
    baseURL: process.env.UI_BASE_URL || fixtureUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});

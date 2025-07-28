import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    screenshot: 'only-on-failure',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});

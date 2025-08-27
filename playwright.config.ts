import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://developer.qiwi.com/ru/payout/v1/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Authorization': 'Bearer test_token'
    }
  },
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Forgot Password Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navigate to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
  });
});

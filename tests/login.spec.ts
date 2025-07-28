import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUsername, validPassword, invalidUsername, invalidPassword } from '../utils/testData';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validUsername, validPassword);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Invalid login with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(invalidUsername, invalidPassword);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await loginPage.warningMessage.first().waitFor({ state: 'visible' });
    await expect(loginPage.warningMessage.first()).toBeVisible();
  });
});

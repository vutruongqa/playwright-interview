import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { validUsername, validPassword } from '../utils/testData';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

test.describe('Sidebar Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login
     const loginPage = new LoginPage(page);
       await loginPage.login(validUsername, validPassword);
       await expect(page).toHaveURL(/dashboard/);
  });

  test('Search exact match: Admin', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('Admin');
    await expect(page.locator('nav')).toContainText('Admin');
  });

  test('Search with lowercase: leave', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('leave');
    await expect(page.locator('nav')).toContainText('Leave');
  });

  test('Partial search: Rec', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('Rec');
    await expect(page.locator('nav')).toContainText('Recruitment');
  });

  test('Search with spaces: "  Buzz "', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('  Buzz ');
    await expect(page.locator('nav')).toContainText('Buzz');
  });

  test('Search invalid item: Payroll', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('Payroll');
    await expect(page.locator('nav')).not.toContainText('Payroll');
  });

  test('Search with symbols: "@@@"', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('@@@');
    await expect(page.locator('nav')).not.toContainText('@@@');
  });

  test('Search with numbers only', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('1234');
    await expect(page.locator('nav')).not.toContainText('1234');
  });

  test('Empty search input', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('');
    await expect(page.locator('nav')).toContainText('Dashboard');
  });

  test('Mixed case search: DaShBoArD', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('DaShBoArD');
    await expect(page.locator('nav')).toContainText('Dashboard');
  });

  test('Long string input', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('thisisaverylongsearchinputtotestmaxlimit');
    await expect(page.locator('nav')).not.toContainText('thisisaverylongsearchinputtotestmaxlimit');
  });
});

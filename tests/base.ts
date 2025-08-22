import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SearchPage } from "../pages/SearchPage";
import { validUsername, validPassword } from '../utils/testData';

type TestFixtures = {
  loginPage: LoginPage;
  searchPage: SearchPage;
};


export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);
    await use(loginPage);
  },
  searchPage: async ({loginPage, page }, use) => {
    const searchPage = new SearchPage(page);
    await searchPage.isDashboardReady();
    await use(searchPage);
  }
});

export { expect } from "@playwright/test";
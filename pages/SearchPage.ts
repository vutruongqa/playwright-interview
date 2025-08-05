import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly searchInput: Locator;
  readonly menuItems: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.searchInput = page.getByPlaceholder('Search');
    this.menuItems =  page.locator('.oxd-main-menu-item-wrapper');
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
  }
  async isDashboardReady() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async getFirstMenuItem() {
    await this.menuItems.first();
  }

  async isMenuContainsText(text: string) {
    await expect(this.getFirstMenuItem()).toContain(text);
  }

  async isMenuContainsTextAtIndex(text: string, index: number) {
    await expect(this.menuItems.nth(index)).toContainText(text);
  }

   async isNumberOfItemsCorrect(numberOfItem: number) {
    await expect(this.menuItems).toHaveCount(numberOfItem);
  }

}

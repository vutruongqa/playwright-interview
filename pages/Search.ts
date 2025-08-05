import { Page, Locator } from '@playwright/test';

export class Search {
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
    await this.usernameInput.fill(keyword);
  }
}

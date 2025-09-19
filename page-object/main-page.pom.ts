import {Page, Locator} from '@playwright/test';

export class MainPage{
  readonly page: Page;
  readonly AcceptAllCookiesLocator: Locator;
  readonly SigninLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.AcceptAllCookiesLocator = page.getByRole("button", { name: "Accept All Cookies" });
    this.SigninLinkLocator = page.getByRole('link', { name: 'Account' });
  }

  async goto() {
    await this.page.goto("https://spanx.com/");
  }

}
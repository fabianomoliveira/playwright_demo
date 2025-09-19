import {Page, Locator} from '@playwright/test';

export class MainPage{
  readonly page: Page;
  readonly AcceptAllCookiesLocator: Locator;
  readonly PopupNewsletterCloseButtonLocator: Locator;
  readonly SigninLinkLocator: Locator;
  readonly LoginButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.AcceptAllCookiesLocator = page.getByRole("button", { name: "Accept All Cookies" });
    this.SigninLinkLocator = page.getByLabel("Account");
    this.LoginButtonLocator = page.getByLabel('Login');
    this.PopupNewsletterCloseButtonLocator = page
      .locator('iframe[title="Sign Up via Text for Offers"]')
      .contentFrame()
      .getByTestId("closeIcon");
  }

  async goto() {
    await this.page.goto("https://spanx.com/");
  }

}
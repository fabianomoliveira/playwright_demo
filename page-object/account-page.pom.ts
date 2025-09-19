import {Page, Locator} from '@playwright/test';

export class AccountPage{
  readonly page: Page;
  readonly SigninTitleLocator: Locator;
  readonly EmailInputLocator: Locator;
  readonly PopUpShopiFramelocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SigninTitleLocator = page.getByRole('heading', { name: 'Sign in' });
    this.EmailInputLocator = page.getByRole("textbox", { name: "Email" });
    this.PopUpShopiFramelocator = page.locator('[data-testid="authorize-iframe"]');
  }
  async goto() {
    await this.page.goto("https://spanx.com/account");
  }

}
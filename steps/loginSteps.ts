import {Given, When, Then} from '@cucumber/cucumber';
import { expect} from '@playwright/test';
import { page } from '../browserSetup';
import { MainPage } from '../page-object/main-page.pom';
import { AccountPage } from "../page-object/account-page.pom";

let mainPage: MainPage;
let accountPage: AccountPage;

Given("the user is on the main page", {timeout: 15000}, async () => {

  mainPage = new MainPage(page);
  await mainPage.goto();

  try {
    await mainPage.AcceptAllCookiesLocator.waitFor({ state: "visible", timeout: 5000 });
    await mainPage.AcceptAllCookiesLocator.click();
  } catch (err) {
    console.error("Cookie button did not appear within 5 seconds; continuing without accepting it.", err);
  }
  
  await expect(page).toHaveTitle(
    "SPANX | Shapewear, Clothing, Activewear & Intimates"
  );
});

When("the user clicks on the sign-in button and enters valid email", async () => {
  accountPage = new AccountPage(page);
  mainPage = new MainPage(page);
  await mainPage.SigninLinkLocator.click();
  await accountPage.SigninTitleLocator.waitFor({ state: 'visible', timeout: 5000 });
  await accountPage.EmailInputLocator.fill("fabiano@maildrop.cc");
});

Then("the web system shows the Shop popup with the email input", async () => {
  accountPage = new AccountPage(page);
  const iframe = await accountPage.PopUpShopiFramelocator.contentFrame();
  if (!iframe) throw new Error("Authorize iframe not available");
  const emailInFrame = iframe.locator("text=fabiano@maildrop.cc");
  await expect(emailInFrame).toBeVisible({ timeout: 5000 });
});

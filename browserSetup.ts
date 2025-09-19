import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser;

Before(async () => {
  try {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
  } catch (error) {
    console.error("Error in Before hook:", error);
    throw error;
  }
});

After(async () => {
  try {
    if (browser) {
      await browser.close();
    }
  } catch (error) {
    console.error("Error in After hook:", error);
  }
});

export { page };

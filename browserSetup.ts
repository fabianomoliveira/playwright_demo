import { Before, After, Status } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser;

Before(async () => {
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: "test-results/videos" },
    });
    page = await context.newPage();

    // Log da URL inicial
    console.log("Browser launched successfully");
  } catch (error) {
    console.error("Error in Before hook:", error);
    throw error;
  }
});

After(async function (scenario) {
  try {
    if (page && scenario.result?.status === Status.FAILED) {
      // Captura screenshot em caso de falha
      const screenshot = await page.screenshot({
        path: `test-results/screenshots/failed-${
          scenario.pickle.name
        }-${Date.now()}.png`,
        fullPage: true,
      });

      // Anexa o screenshot ao relatório
      this.attach(screenshot, "image/png");

      // Captura informações adiciais da página
      const url = page.url();
      const title = await page.title();

      console.log(`Test failed on page: ${title} (${url})`);
      this.attach(`Page URL: ${url}\nPage Title: ${title}`, "text/plain");
    }

    if (browser) {
      await browser.close();
      console.log("Browser closed successfully");
    }
  } catch (error) {
    console.error("Error in After hook:", error);
  }
});

export { page };

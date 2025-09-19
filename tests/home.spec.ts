import {test, expect} from "@playwright/test"

test('Home Page', async ({ page }) => {
  // Open the Spanx home page
  await page.goto("https://spanx.com/");

  //Click on Accept all Cookies
  await page.getByRole("button", { name: "Accept All Cookies" }).click();

  // Close the iframe
  await page
    .locator('iframe[title="Sign Up via Text for Offers"]')
    .contentFrame()
    .getByTestId("closeIcon")
    .click();


  // Check the page title
  await expect(page).toHaveTitle("SPANX | Shapewear, Clothing, Activewear & Intimates");

  // Click on Profile Image
  await page.getByRole('link', { name: 'Account' }).click();

  // Check if the account menu is visible
  await page.locator('h2', { hasText: 'Sign in' }).waitFor({ state: 'visible', timeout: 5000 });

  await page.getByRole('textbox', { name: 'Email' }).fill('fabiano@maildrop.cc');
  
  // Wait the web page show the popup message
  const frame = await page.locator('[data-testid="authorize-iframe"]').contentFrame();
  if (!frame) throw new Error('Authorize iframe not available');
  const emailInFrame = frame.locator('text=fabiano@maildrop.cc');
  await expect(emailInFrame).toBeVisible({ timeout: 5000 });
  
});

// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://146.185.235.4//');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://146.185.235.4//');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});

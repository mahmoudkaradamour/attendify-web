import { test, expect } from '@playwright/test';

test('home page has title and nav', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Attendify/);
  const nav = page.locator('nav[aria-label="Primary navigation"]');
  await expect(nav).toBeVisible();
});

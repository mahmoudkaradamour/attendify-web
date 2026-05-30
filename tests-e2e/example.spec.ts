import { test, expect } from '@playwright/test';

test('home page has title and nav', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Attendify/);
  const nav = page.locator('nav[aria-label="Primary navigation"]');
  await expect(nav).toBeVisible();
});

for (const route of ['/access', '/admin', '/portal', '/subscriptions', '/docs']) {
  test(`route ${route} renders a page`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('nav[aria-label="Primary navigation"]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
}

import { test, expect } from '@playwright/test';

test('TC-07: Verify Test Cases Page', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. "Test Cases" appears in nav and in the homepage CTA — first() targets the nav link
  await page.getByRole('link', { name: 'Test Cases' }).first().click();

  // 5
  await expect(page).toHaveURL(/\/test_cases/);
  await expect(page.getByRole('heading', { name: /test cases/i }).first()).toBeVisible();
});

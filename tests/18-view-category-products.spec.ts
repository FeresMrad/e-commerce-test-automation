import { test, expect } from '@playwright/test';

test('TC-18: View Category Products', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3. Categories sidebar visible
  await expect(page.getByRole('heading', { name: /category/i })).toBeVisible();

  // 4. Expand Women in the accordion
  await page.locator('a[href="#Women"]').click();

  // 5. Click a sub-category (Dress)
  await page.locator('a[href="/category_products/1"]').click();

  // 6. Source test case has a typo ("WOMEN - TOPS"); we verify a Women-products heading instead
  await expect(page).toHaveURL(/\/category_products\//);
  await expect(page.getByRole('heading', { name: /women.*products/i })).toBeVisible();

  // 7. Expand Men, click Tshirts
  await page.locator('a[href="#Men"]').click();
  await page.locator('a[href="/category_products/3"]').click();

  // 8
  await expect(page).toHaveURL(/\/category_products\//);
  await expect(page.getByRole('heading', { name: /men.*products/i })).toBeVisible();
});

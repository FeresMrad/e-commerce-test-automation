import { test, expect } from '@playwright/test';

test('TC-19: View & Cart Brand Products', async ({ page }) => {
  // 1-2
  await page.goto('/');

  // 3
  await page.getByRole('link', { name: 'Products' }).first().click();
  await expect(page).toHaveURL(/\/products/);

  // 4. Brands section visible
  await expect(page.getByRole('heading', { name: /brands/i })).toBeVisible();

  // 5. Click first brand (Polo)
  await page.locator('a[href="/brand_products/Polo"]').click();

  // 6
  await expect(page).toHaveURL(/\/brand_products\/Polo/);
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

  // 7. Click second brand (H&M)
  await page.locator('a[href="/brand_products/H&M"]').click();

  // 8
  await expect(page).toHaveURL(/\/brand_products\//);
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
});
